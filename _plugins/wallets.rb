# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'yaml'

module Jekyll

  class WalletPage < Page
    def initialize(site, base, dir, wallet, platform, os, lang)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'wallet-container.html')
      self.data['wallet'] = wallet
      self.data['platform'] = platform
      self.data['os'] = os
      self.data['id'] = ['wallets', platform['name'], os['name'], wallet['id']].join('-')
      self.data['lang'] = lang
    end
  end

  class WalletsPageGenerator < Generator
    safe true

    def generate(site)
      # Get the collection of wallets from _wallets
      walletsCol = site.collections['wallets'];

      # Output dir
      # TODO: Make this configurable and "translatable"
      walletsDir = 'wallets'

      # Loading translations.
      # Copy-paste from _plugins/templates.rb
      locs = {}
      enabled = ENV['ENABLED_LANGS'];
      enabled = enabled.split(' ') if !enabled.nil?
      Dir.foreach('_translations') do |file|
        next if file == '.' or file == '..' or file == 'COPYING'
        lang = file.split('.')[0]
        # Ignore language if it's disabled
        if lang != 'en' and !enabled.nil? and !enabled.include?(lang)
          puts('Lang ' + lang + ' disabled')
          next
        end
        locs[lang] = YAML.load_file("_translations/"+file)[lang]
      end

      puts('----- Generating wallet pages -----')

      # Getting information about each found wallet
      walletsCol.docs.each do |doc|
        file = doc.path
        wallet = YAML.load_file(file)
        walletPlatforms = wallet['platform']

        puts(wallet['id'] + ' is loaded. Generating pages...')

        # Going through all available combinations of
        # platforms and OSes
        walletPlatforms.each do |platform|
          platform['os'].each do |os|

            # This allows generation only of valid wallet pages
            if platform['name']

              locs.each do |lang,value|
                dir = File.join(platform['name'], os['name'], wallet['id'])
                site.pages << WalletPage.new(site, site.source, File.join(lang, walletsDir, dir), wallet, platform, os, lang)
              end
            end

          end
        end

        puts(wallet['id'] + ' is processed.')
      end

      puts('----- Wallet pages generated -----')

    end
  end

end
