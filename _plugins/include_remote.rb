# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
require 'nokogiri'
require 'open-uri'
require 'uri'

class Jekyll::IncludeRemoteTag < Jekyll::Tags::IncludeTag
  @@remote_cache = {}

  def initialize(tag_name, markup, tokens)
    super
    @url = @file
  end

  def validate_url(url)
    if url !~ URI::regexp
      raise ArgumentError.new <<-eos
Invalid syntax for include_remote tag. URL contains invalid characters or sequences:

#{url}

Valid syntax:

#{syntax_example}

eos
    end
  end

  def syntax_example
    "{% #{@tag_name} http://domain.ltd css=\".menu\" xpath=\"//div[@class='.menu']\" param=\"value\" param2=\"value\" %}"
  end

  def render(context)
    @url = render_variable(context) || @url
    validate_url(@url)

    if @params
      validate_params
      @params = parse_params(context)
    end

    xpath = @params['xpath']
    css = @params['css']

    if ! html = @@remote_cache["#{@url}_#{xpath}"]
      # fetch remote file
      page = Nokogiri::HTML(open(@url))

      # parse extract xpath/css fragments if necessary
      node = page.at_xpath(xpath) if xpath
      node = page.css(css) if css
      node = page if !node

      raise IOError.new "Error while parsing remote file '#{@url}': '#{xpath||css}' not found" if !node

      # cache result
      html = @@remote_cache["#{@url}_#{xpath}"] = node.to_s
    end

    begin
      partial = Liquid::Template.parse(html)

      context.stack do
        context['include'] = @params
        partial.render!(context)
      end
    rescue => e
      raise Jekyll::Tags::IncludeTagError.new e.message, @url
    end
  end
end

Liquid::Template.register_tag('include_remote', Jekyll::IncludeRemoteTag)
