# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'yaml'
require 'kramdown'

module Jekyll

    class DevdocCategoryPage < Page
        def initialize(site, base, category, lang)
            @site = site
            @base = base
            @dir = File.join(lang, 'developer-documentation', category)
            @name = 'index.html'
            self.process(@name)
            self.read_yaml(File.join(base, '_devdocs', lang), category + '.md')
            self.data['lang'] = lang
            self.data['pages'] = []

            # This should happen per lang folder
            Dir.glob('_devdocs/' + lang + '/' + category + '/*.md').sort.each do |itemFname|
                next if !is_valid_file(itemFname)
                self.data['pages'] << itemFname
            end
        end

        def is_valid_file(file)
            return !(file == '.' or file == '..' or File.extname(file) != '.md')
        end
    end

    class DevdocPageGenerator < Generator
        safe true

        def generate(site)

            lang = 'en'

            # Loading devdocs categories
            Dir.foreach('_devdocs/' + lang) do |file|
                next if !is_valid_file(file)

                # Category
                category = file.split('.')[0]

                site.pages << DevdocCategoryPage.new(site, site.source, category, lang)
            end

        end

        def is_valid_file(file)
            return !(file == '.' or file == '..' or File.extname(file) != '.md')
        end
    end

end

module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    require "kramdown"
    def render(context)
      content = super
      "#{Kramdown::Document.new(content).to_html}"
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
