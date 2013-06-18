require 'yaml'
require 'cgi'

#translate( id [,category ,lang] )
#Return translated string using translations files

#category and lang are set to current page.id and page.lang, but they can
#also be set manually to get translations for global layout and urls.
#Example: {% translate button-wallet layout %} will return the
#translated button-wallet string for the global layout file

#dynamic variables can be used as arguments
#Example: {% translate menu-{{id}} %}

#urls and anchors are automatically replaced and translated. 
#Example: #vocabulary##[vocabulary.wallet] is replaced by
#/en/vocabulary#wallet when the page is in english or
#/fr/vocabulaire#porte-monnaie when the page is in french.

module Jekyll
  class TranslateTag < Liquid::Tag

    def initialize(tag_name, id, tokens)
      super
      @id = id
    end

    def render(context)
      #load translations files
      site = context.registers[:site].config
      if !site.has_key?("loc")
        site['loc'] = {}
        site['langs'].each do |key,value|
          site['loc'][key] = YAML.load_file('_translations/'+key+'.yml')[key]
        end
      end
      #define id, category and lang
      lang = Liquid::Template.parse("{{page.lang}}").render context
      cat = Liquid::Template.parse("{{page.id}}").render context
      id=@id.split(' ')
      if !id[1].nil?
        cat = Liquid::Template.parse(id[1]).render context
      end
      if !id[2].nil?
        lang = Liquid::Template.parse(id[2]).render context
      end
      id=Liquid::Template.parse(id[0]).render context
      if lang == ''
        lang = 'en'
      end
      #get translated string
      text = ''
      if site['loc'][lang].has_key?(cat) && site['loc'][lang][cat].has_key?(id) && !site['loc'][lang][cat][id].nil?
        text = site['loc'][lang][cat][id]
      end
      #urlencode if string is a url
      if cat == 'url'
        text=CGI::escape(text)
      end
      #replace urls and anchors in string
      url = site['loc'][lang]['url']
      url.each do |key,value|
        if !value.nil?
          text.gsub!("#"+key+"#",'/'+lang+'/'+CGI::escape(value))
        end
      end
      anc = site['loc'][lang]['anchor']
      anc.each do |page,anch|
        anch.each do |key,value|
          if !value.nil?
            text.gsub!("["+page+'.'+key+"]",CGI::escape(value))
          end
        end
      end
      text
    end
  end
end

Liquid::Template.register_tag('translate', Jekyll::TranslateTag)
