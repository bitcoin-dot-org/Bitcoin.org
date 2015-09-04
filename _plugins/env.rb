# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## env.rb takes select environmental variables and makes them available
## to the site templates. Currently, only variables starting with
## BITCOINORG_ are exported

module Jekyll
  class EnvGenerator < Generator
    def generate(site)
      ## If necessary, initialize env hash table
      site.config["env"] = site.config["env"] ? site.config["env"] : {}

      ## Load matching environmental variables in to array
      ENV.keys.grep /^BITCOINORG_/ do |key|
        site.config['env'].merge!({ key => ENV[key] })
      end
    end
  end
end
