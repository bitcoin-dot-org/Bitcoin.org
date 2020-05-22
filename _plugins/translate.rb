# frozen_string_literal: true

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# translate( id [,category ,lang] )
# Return translated string using translations files

# category and lang are set to current page.id and page.lang, but they can
# also be set manually to get translations for global layout and urls.
# Example: {% translate button-wallet layout %} will return the
# translated button-wallet string for the global layout file

# dynamic variables can be used as arguments
# Example: {% translate menu-{{id}} %}

# urls and anchors are automatically replaced and translated.
# Example: #vocabulary##[vocabulary.wallet] is replaced by
# /en/vocabulary#wallet when the page is in english or
# /fr/vocabulaire#porte-monnaie when the page is in french.

require 'yaml'
require 'cgi'

module Jekyll
  class TranslateTag < Liquid::Tag
    def initialize(tag_name, id, tokens)
      super
      @id = id
    end

    def render(context)
      # Load translations
      site = context.registers[:site].config
      unless site.key?('loc')
        site['loc'] = {}
        Dir.foreach('_translations') do |file|
          next if (file == '.') || (file == '..')

          lang = file.split('.')[0]
          site['loc'][lang] = YAML.load_file('_translations/' + file)[lang]
        end
      end
      # define id, category and lang
      defaulten = true
      lang = Liquid::Template.parse('{{page.lang}}').render context
      cat = Liquid::Template.parse('{{page.id}}').render context
      id = @id.split(' ')
      cat = Liquid::Template.parse(id[1]).render context unless id[1].nil?
      unless id[2].nil?
        lang = Liquid::Template.parse(id[2]).render context
        defaulten = false
      end
      id = Liquid::Template.parse(id[0]).render context
      lang = 'en' if lang == ''
      # get translated string
      text = ''
      keys = cat.split('.')
      ar = site['loc'][lang]
      # recursive loop to handle cases where category is like "anchor.vocabulary"
      keys.each do |key|
        break if !ar.is_a?(Hash) || !ar.key?(key) || !ar[key].is_a?(Hash)

        ar = ar[key]
      end
      text = ar[id] if ar.key?(id) && ar[id].is_a?(String)
      # fallback to English if string is empty
      if (text == '') && (defaulten == true)
        lang = 'en'
        ar = site['loc'][lang]
        keys.each do |key|
          break if !ar.is_a?(Hash) || !ar.key?(key) || !ar[key].is_a?(Hash)

          ar = ar[key]
        end
        text = ar[id] if ar.key?(id) && ar[id].is_a?(String)
      end
      # interpret Liquid templating in string
      text = Liquid::Template.parse(text).render context

      # replace urls and anchors in string
      url = site['loc'][lang]['url']
      url.each do |key, value|
        text.gsub!('#' + key + '#', '/' + lang + '/' + CGI.escape(value)) unless value.nil?
      end

      ## Hack for renaming links to the Bitcoin paper. Safe to remove
      ## when all languages have "bitcoin-paper:" defined in the "url:"
      ## section of their '_translations' YAML file.
      text.gsub!('#bitcoin-paper#', '/bitcoin.pdf')

      anc = site['loc'][lang]['anchor']
      anc.each do |page, anch|
        anch.each do |key, value|
          text.gsub!('[' + page + '.' + key + ']', CGI.escape(value)) unless value.nil?
        end
      end
      text
    end
  end
end

Liquid::Template.register_tag('translate', Jekyll::TranslateTag)
