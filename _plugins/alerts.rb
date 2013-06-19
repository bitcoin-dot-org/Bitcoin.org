require 'yaml'

module Jekyll
  
  class AlertPage < Page
    def initialize(site, base, lang, srcdir, src, dstdir, dst, date)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['lang'] = lang
      self.data['date'] = date
      self.data['layout'] = 'alert'
      if dstdir == ''
        self.data['redirect'] = src.split('.')[0]
      else
        self.data['category'] = 'alert'
        if self.data.has_key?('alias')
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', self.data['alias']+'.html', date)
        end
      end
    end
  end

  class AlertPageGenerator < Generator
    def generate(site)
      #generate each alert based on templates
      Dir.foreach('_alerts') do |file|
        next if file == '.' or file == '..'
        lang = 'en'
        src = file
        dst = file
        srcdir = '_alerts'
        dstdir = lang + '/alert'
        date = dst.split('-')
        next if date.length < 4
        date = date[0] + '-' + date[1] + '-' + date[2]
        next if !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.match(date)
        site.pages << AlertPage.new(site, site.source, lang, '_alerts', src, dstdir, dst, date)
      end
      #TODO alerts are only generated for english language,
      #but they could also be translated at some point. They would however
      #need to fallback to english when no translation is available.
    end
  end

end
