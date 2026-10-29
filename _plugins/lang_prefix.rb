# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# lang_prefix returns the URL path prefix of a language, for example "/en"
# or "/pt_BR". It is the one place that decides how a language appears in
# URLs, so templates and plugins should use it instead of writing the
# "/{{ page.lang }}" prefix by hand.

# Example:
# <a href="{{ page.lang | lang_prefix }}/{% translate faq url %}">

module LangPrefix

  def self.for(lang)
    '/' + lang.to_s
  end

  def lang_prefix(lang)
    LangPrefix.for(lang)
  end

  Liquid::Template.register_filter self

end
