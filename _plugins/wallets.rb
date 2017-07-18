# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'yaml'

module Jekyll

  class WalletPage < Page
    def initialize(site, base, dir, wallet, platform, os)
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
    end
  end

  class WalletsPageGenerator < Generator
    safe true

    def generate(site)
      walletsCol = site.collections['wallets'];
      walletsDir = 'wallets'

      walletsCol.docs.each do |doc|
        file = doc.path
        wallet = YAML.load_file(file)
        walletPlatforms = wallet['platform']

        puts('---------------------')
        puts(wallet['id'])

        walletPlatforms.each do |platform|
          platform['os'].each do |os|
            if platform['name']
                dir = File.join(platform['name'], os['name'], wallet['id'])
              site.pages << WalletPage.new(site, site.source, File.join('en', walletsDir, dir), wallet, platform, os)
            end
          end
        end
      end

    end
  end

end
