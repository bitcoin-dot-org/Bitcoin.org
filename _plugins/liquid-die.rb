# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## liquid-die.rb terminates site compilation in failure. This can allow
## us to avoid updating the site HTML with a broken layout

## Example:
## {% if some_variable_is_set %}
##     ...content...
## {% else %}
##     {% die %}
## {% endif %}

module Jekyll

  class LiquidDie < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @error = text
    end

    def render(context)
        ## Produces: Liquid die tag called. [<Error.>] -- Error creating output [in <output file name>]
        abort("Liquid die tag called. " + @error + " -- Error creating output" )
    end
  end
end


Liquid::Template.register_tag('die', Jekyll::LiquidDie)
