# frozen_string_literal: true

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'yaml'

module Jekyll
  class WalletPage < Page
    def initialize(site, base, dir, wallet, platform, os, title, lang)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'wallet-container.html')
      data['wallet'] = wallet
      data['platform'] = platform
      data['os'] = os
      data['id'] = ['wallets', platform['name'], os['name'], wallet['id']].join('-')
      data['lang'] = lang
      data['title'] = title
    end
  end

  class PlatformPage < Page
    def initialize(site, base, dir, platform, os, title, lang)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'wallet-platform.html')
      data['platform'] = platform
      data['os'] = os
      data['id'] = ['wallets', platform['name'], os['name']].join('-')
      data['lang'] = lang
      data['title'] = title
    end
  end

  class WalletsPageGenerator < Generator
    safe true

    def generate(site)
      # Get the collection of wallets from _wallets
      walletsCol = site.collections['wallets']

      # Get the collection of wallets from _wallets
      platformsCol = site.collections['platforms']

      # Output dir
      # TODO: Make this configurable and "translatable"
      walletsDir = 'wallets'

      # Loading translations.
      # Copy-paste from _plugins/templates.rb
      locs = {}
      enabled = ENV['ENABLED_LANGS']
      enabled = enabled.split(' ') unless enabled.nil?
      Dir.foreach('_translations') do |file|
        next if (file == '.') || (file == '..') || (file == 'COPYING')

        lang = file.split('.')[0]
        # Ignore language if it's disabled
        if (lang != 'en') && !enabled.nil? && !enabled.include?(lang)
          puts('Lang ' + lang + ' disabled')
          next
        end
        locs[lang] = YAML.load_file('_translations/' + file)[lang]
      end

      # Getting information about each found wallet
      locs.each do |lang, _value|
        title = locs[lang]['choose-your-wallet']['title']

        platformsCol.docs.each do |doc|
          file = doc.path
          data = YAML.load_file(file)
          platform = data['platform']
          os = data['os']
          dir = if platform['name'] == os['name']
                  File.join(platform['name'])
                else
                  File.join(platform['name'], os['name'])
                end

          platformTitle = locs[lang]['choose-your-wallet']['walletcat' + platform['name']]
          osTitle = locs[lang]['choose-your-wallet']['platform' + os['name']]
          fullTitle = if osTitle.nil?
                        [platformTitle, title].join(' - ')
                      else
                        [platformTitle, osTitle, title].join(' - ')
                      end
          site.pages << PlatformPage.new(site, site.source, File.join(lang, walletsDir, dir), platform, os, fullTitle, lang)
        end

        walletsCol.docs.each do |doc|
          file = doc.path
          wallet = YAML.load_file(file)
          walletPlatforms = wallet['platform']

          # Going through all available combinations of
          # platforms and OSes
          walletPlatforms.each do |platform|
            platform['os'].each do |os|
              # This allows generation only of valid wallet pages
              next unless platform['name']

              dir = if platform['name'] == os['name']
                      File.join(platform['name'], wallet['id'])
                    else
                      File.join(platform['name'], os['name'], wallet['id'])
                    end

              platformTitle = locs[lang]['choose-your-wallet']['walletcat' + platform['name']]
              osTitle = locs[lang]['choose-your-wallet']['platform' + os['name']]
              walletTitle = wallet['title']

              fullTitle = if osTitle.nil?
                            [walletTitle, platformTitle, title].join(' - ')
                          else
                            [walletTitle, platformTitle, osTitle, title].join(' - ')
                          end

              site.pages << WalletPage.new(site, site.source, File.join(lang, walletsDir, dir), wallet, platform, os, fullTitle, lang)
            end
          end
        end
      end
    end
  end
end
