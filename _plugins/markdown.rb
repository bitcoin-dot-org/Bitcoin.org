# frozen_string_literal: false

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    require 'kramdown'
    def render(context)
      content = super
      Kramdown::Document.new(content).to_html.to_s
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
