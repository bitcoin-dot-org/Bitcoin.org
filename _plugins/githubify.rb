# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## githubify.rb automatically adds links to pull requests, issues, and
## commits using pattern matches

## Example (URL is the repository to link to):
## {% githubify https://github.com/bitcoin/bitcoin %}
## ...content...
## {% endgithubify %}

module Jekyll

require 'yaml'

  class GitHubifyBlock < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
      @repository_url = text.strip()
    end

    def render(context)
      output = super

      ## Convert #1234 into URL for the pull request
      ## If #1234 links to an issue, GitHub automatically redirects
      #
      ## Require at least two digits to reduce false positive matches
      output.gsub!(/#([0-9][0-9][0-9]*)/){ |s|
        '<a href="' + @repository_url + '/pull/' + $1 + '">' + s + '</a>'
      }

      ## Convert `123abcd` into URL for the commit
      #
      ## Only operate on 7 to 10 chars to reduce false positive matches
      output.gsub!(/`([0-9abcdef]{7,10})`/){ |s|
        '<a href="' + @repository_url + '/commit/' + $1 + '">' + s + '</a>'
      }

      output
    end
  end
end


## Code to run if plugin is disabled
module Jekyll

require 'yaml'

  class GitHubifyBlockDisabled < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      output = super

      output
    end
  end
end

#Do nothing if plugin is disabled
plugin_name = "githubify"
if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index(plugin_name).nil?
  print plugin_name + ' disabled' + "\n"
  Liquid::Template.register_tag(plugin_name, Jekyll::GitHubifyBlockDisabled)
else
  Liquid::Template.register_tag(plugin_name, Jekyll::GitHubifyBlock)
end
