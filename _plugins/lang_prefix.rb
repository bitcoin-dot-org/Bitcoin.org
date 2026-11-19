# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# lang_prefix returns the URL path prefix of a language: "" for English,
# which is served at the site root, and "/<lang>" for translations, for
# example "/pt_BR". It is the one place that decides how a language
# appears in URLs, so templates and plugins should use it instead of
# writing a "/{{ page.lang }}" prefix by hand.

# Example:
# <a href="{{ page.lang | lang_prefix }}/{% translate faq url %}">

module LangPrefix

  ROOT_LANG = 'en'

  # URL prefix, without a trailing slash.
  def self.for(lang)
    lang.to_s == ROOT_LANG ? '' : '/' + lang.to_s
  end

  # Output directory, relative to the site root.
  def self.dir(lang)
    lang.to_s == ROOT_LANG ? '' : lang.to_s
  end

  # Joins path segments, skipping the empty English directory.
  def self.join(*parts)
    parts.map(&:to_s).reject(&:empty?).join('/')
  end

  def lang_prefix(lang)
    LangPrefix.for(lang)
  end

  Liquid::Template.register_filter self

end
