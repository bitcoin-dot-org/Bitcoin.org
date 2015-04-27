# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## liquid-warn.rb prints a warning to stdout (not stderr). This can allow
## someone manually building the site (or reviewing logs) to detect a problem

## Example:
## {% if some_variable_is_set %}
##     ...content...
## {% else %}
##     {% warn "Optional message" %}
## {% endif %}

module Jekyll

  class LiquidWarn < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @warning = text
    end

    def render(context)
        ## Use "notice" instead of "warning" because we use grep to
        ## treat some Jekyll warnings as errors
        print "Notice: " + @warning + "\n"
    end
  end
end

Liquid::Template.register_tag('warn', Jekyll::LiquidWarn)
