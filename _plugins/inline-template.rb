# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## inline-template.rb reformats inline YAML using a template file from
## the _template directory. (File must end in .inline)

## Example:
## {% itemplate %}
## ...YAML...
## {% enditemplate %}

module Jekyll

require 'yaml'

  class InlineTemplateBlock < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
      @template_name = '_templates/' + text.gsub(' ','') + '.inline'
    end

    def render(context)
      output = super

      data = YAML.load(output)
      template = File.open(@template_name, mode="r")
      @mytemplate = Liquid::Template.parse(template.read())
      @mytemplate.render('entry' => data)
    end
  end
end

module Jekyll

require 'yaml'

  class InlineTemplateBlockDisabled < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      output = super

      output
      #return('Inline Template (itemplate) disabled' + "\n")
    end
  end
end



#Do nothing if plugin is disabled
## Note: tested 2015-04-12 and the site actually compiles 5 seconds
##       *faster* with this enabled, so hardcoding it to enabled for now
if false #!ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('itemplate').nil?
  print 'Inline Template (itemplate) disabled' + "\n"
  Liquid::Template.register_tag('itemplate', Jekyll::InlineTemplateBlockDisabled)
else
  Liquid::Template.register_tag('itemplate', Jekyll::InlineTemplateBlock)
end
