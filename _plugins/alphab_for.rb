require 'yaml'
require 'ffi-icu'

#alphab_for allows to loop in an array sorted by the translated value of
#each key using appropriate collation for the current language. Example :
#{% alphab_for v in page.voc %}
#  ..
#{% endalphab_for %}

module Jekyll
  module AlphabForImpl
    def render(context)
      #load translations files
      site = context.registers[:site].config
      if !site.has_key?("loc")
        site['loc'] = {}
        site['langs'].each do |key,value|
          site['loc'][key] = YAML.load_file('_translations/'+key+'.yml')[key]
        end
      end
      #load collection and context variables
      sorted_collection = collection_to_sort context
      return if sorted_collection.empty?
      lang = Liquid::Template.parse('{{page.lang}}').render context
      page = Liquid::Template.parse('{{page.id}}').render context
      #build translated array and associative hash
      translated = []
      assoc = {}
      for key in sorted_collection do
        next if !site['loc'][lang].has_key?(page) || !site['loc'][lang][page].has_key?(key) || site['loc'][lang][page][key].nil?
        t = site['loc'][lang][page][key]
        translated.push(t)
        assoc[key] = t
      end
      #sort translated array using appropriate collation
      translated = ICU::Collation.collate(lang, translated)
      #recreate collection with new ordering
      sorted_collection = []
      for va in translated do
        val = assoc.select{|k,v| v == va}
        #compatibility with old ruby versions that return an Array
        if val.is_a?(Array)
          val = { val[0][0] => va }
        end
        val = val.keys[0]
        sorted_collection.push(val)
      end
      #return modified array
      original_name = @collection_name
      result = nil
      context.stack do
        sorted_collection_name = "#{@collection_name}_sorted".sub('.', '_')
        context[sorted_collection_name] = sorted_collection
        @collection_name = sorted_collection_name
        result = super
        @collection_name = original_name
      end
      result
    end
  end
 
  class AlphabForTag < Liquid::For
    include AlphabForImpl
 
    def collection_to_sort(context)
      return context[@collection_name].dup
    end
 
    def end_tag
      'endalphab_for'
    end
  end
end
 
Liquid::Template.register_tag('alphab_for', Jekyll::AlphabForTag)
