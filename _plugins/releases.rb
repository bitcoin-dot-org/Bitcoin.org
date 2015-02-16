# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#releases.rb generates release pages using files in _releases
#and assign them the 'release' category.

#This is later used to loop through site.pages in order
#to display the release's list in chronological order, both
#on the "Version history" page and RSS file.

#This plugin also set site.DOWNLOAD_VERSION to the latest
#available version of Bitcoin Core, which is used everywhere
#in the download page.

#Alias redirection pages are generated in /releases to avoid
#breaking previous links in various websites.

require 'yaml'

module Jekyll
  
  class ReleasePage < Page

    def initialize(site, base, lang, srcdir, src, dstdir, dst, year, month, day)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst.gsub('.md','.html')
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['lang'] = lang
      self.data['date'] = year + '-' + month + '-' + day
      self.data['version'] = dst.gsub('.md','').gsub(/[a-z]/,'')
      self.data['versionint'] = versiontoint(self.data['version'])
      self.data['layout'] = 'release'
      if dstdir.index('/releases/') === 0
        self.data['redirect'] = '/en/release/' + dst.gsub('.md','')
        self.data['layout'] = 'redirect'
      else
        self.data['category'] = 'release'
        if !site.config.has_key?('DOWNLOAD_VERSION') or site.config['DOWNLOAD_VERSIONINT'] < self.data['versionint']
          site.config['DOWNLOAD_VERSIONINT'] = self.data['versionint']
          site.config['DOWNLOAD_VERSION'] = self.data['version']
          site.config.delete('DOWNLOAD_MAGNETLINK') if site.config.has_key?('DOWNLOAD_MAGNETLINK')
          site.config['DOWNLOAD_MAGNETLINK'] = self.data['magnetlink'] if self.data.has_key?('magnetlink')
        end
        site.pages << ReleasePage.new(site, base, lang, srcdir, src, '/releases/' + year + '/' + month + '/' + day, dst, year, month, day)
      end
    end

    def versiontoint(v)
      x = 0
      ar = v.split('.').map{|s| s.to_i}
      ar.each_index do |k|
        x += ar[k] * (1000 ** (5 - k))
      end
      return x
    end

  end

  class ReleasePageGenerator < Generator
    def generate(site)

      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('releases').nil?
        print 'Releases disabled' + "\n"
        return
      end

      #generate each release based on templates
      Dir.foreach('_releases') do |file|
        next if file == '.' or file == '..'
        lang = 'en'
        src = file
        dst = file.split('-')
        next if dst.length < 4
        year = dst.shift()
        month = dst.shift()
        day = dst.shift()
        next if !/^[0-9]{4}$/.match(year)
        next if !/^[0-9]{2}$/.match(month)
        next if !/^[0-9]{2}$/.match(day)
        dst = dst.join('-')
        srcdir = '_releases'
        dstdir = lang + '/release'
        site.pages << ReleasePage.new(site, site.source, lang, '_releases', src, dstdir, dst, year, month, day)
      end
      #TODO releases are only generated for english language,
      #but they could also be translated at some point. They would however
      #need to fallback to english when no translation is available.
    end
  end

end
