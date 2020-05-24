# frozen_string_literal: false

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
      wallets = site.collections['wallets']

      # Get the collection of wallets from _wallets
      platforms = site.collections['platforms']

      # Output dir
      # TODO: Make this configurable and "translatable"
      wallets_dir = 'wallets'

      # Loading translations.
      # Copy-paste from _plugins/templates.rb
      locs = {}
      enabled = ENV['ENABLED_LANGS']
      enabled = enabled.split(' ') unless enabled.nil?
      Dir.foreach('_translations') do |file|
        next if ['.', '..', 'COPYING'].include?(file)

        lang = file.split('.').first
        # Ignore language if it's disabled
        if (lang != 'en') && !enabled.nil? && !enabled.include?(lang)
          puts("Language #{lang} disabled")
          next
        end
        locs[lang] = YAML.load_file('_translations/' + file)[lang]
      end

      # Getting information about each found wallet
      locs.each do |lang, _value|
        title = locs[lang]['choose-your-wallet']['title']

        platforms.docs.each do |doc|
          file = doc.path
          data = YAML.load_file(file)
          platform = data['platform']
          os = data['os']
          dir = if platform['name'] == os['name']
                  File.join(platform['name'])
                else
                  File.join(platform['name'], os['name'])
                end

          platform_title = locs[lang]['choose-your-wallet']['walletcat' + platform['name']]
          os_title = locs[lang]['choose-your-wallet']['platform' + os['name']]
          full_title = if os_title.nil?
                         [platform_title, title].join(' - ')
                       else
                         [platform_title, os_title, title].join(' - ')
                       end
          site.pages << PlatformPage.new(
            site,
            site.source,
            File.join(lang, wallets_dir, dir),
            platform,
            os,
            full_title,
            lang
          )
        end

        wallets.docs.each do |doc|
          file = doc.path
          wallet = YAML.load_file(file)
          platforms = wallet['platform']

          # Going through all available combinations of
          # platforms and OSes
          platforms.each do |platform|
            platform['os'].each do |os|
              # This allows generation only of valid wallet pages
              next unless platform['name']

              dir = if platform['name'] == os['name']
                      File.join(platform['name'], wallet['id'])
                    else
                      File.join(platform['name'], os['name'], wallet['id'])
                    end

              platform_title = locs[lang]['choose-your-wallet']['walletcat' + platform['name']]
              os_title = locs[lang]['choose-your-wallet']['platform' + os['name']]
              wallet_title = wallet['title']

              full_title = if os_title.nil?
                             [wallet_title, platform_title, title].join(' - ')
                           else
                             [wallet_title, platform_title, os_title, title].join(' - ')
                           end

              site.pages << WalletPage.new(
                site,
                site.source,
                File.join(lang, wallets_dir, dir),
                wallet,
                platform,
                os,
                full_title,
                lang
              )
            end
          end
        end
      end
    end
  end
end
