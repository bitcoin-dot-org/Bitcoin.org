#catpage_for allows to loop in site.pages sorted by custom page
#variables and filtered by page.category.
#Example : {% catpage_for p in site.pages sort_by:date category:release %}

module Jekyll
  module SortedForImpl
    def render(context)
      sorted_collection = collection_to_sort context
      return if sorted_collection.empty?
      sort_attr = @attributes['sort_by']
      category_attr = @attributes['category']
      #filter page by given category
      s = []
      for x in sorted_collection
        if x.to_liquid.has_key?('category') && x.to_liquid['category'] == category_attr
          s.push(x)
        end
      end
      sorted_collection = s
      #sort collection by given variable
      sorted_collection = sorted_collection.sort_by { |i| i.to_liquid[sort_attr] }
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
 
  class SortedForTag < Liquid::For
    include SortedForImpl
 
    def collection_to_sort(context)
      return context[@collection_name].dup
    end
 
    def end_tag
      'endcatpage_for'
    end
  end
end
 
Liquid::Template.register_tag('catpage_for', Jekyll::SortedForTag)
