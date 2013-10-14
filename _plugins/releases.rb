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
      self.data['layout'] = 'release'
      if dstdir.index('/releases/') === 0
        self.data['redirect'] = '/en/release/' + dst.gsub('.md','')
        self.data['layout'] = 'redirect'
      else
        self.data['category'] = 'release'
        if !site.config.has_key?('DOWNLOAD_DATE') or site.config['DOWNLOAD_DATE'] < year + '-' + month + '-' + day
          site.config['DOWNLOAD_DATE'] = year + '-' + month + '-' + day
          site.config['DOWNLOAD_VERSION'] = dst.gsub('.md','').gsub(/[a-z]/,'')
        end
        site.pages << ReleasePage.new(site, base, lang, srcdir, src, '/releases/' + year + '/' + month + '/' + day, dst, year, month, day)
      end
    end
  end

  class ReleasePageGenerator < Generator
    def generate(site)
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
