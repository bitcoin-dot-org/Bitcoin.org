#alerts.rb generates alert pages using files in _alerts
#and assign them the 'alert' category.

#This is later used to loop through site.pages in order
#to display the alert's list in chronological order, both
#on the "Alerts" page and RSS file.

#If "banner" variable is set in one alert file, site.ALERT
#variable is set, allowing a clickable alert banner to be
#displayed in _layouts/base.html .

#If "alias" variable is set in one alert file, a short alias
#file for the alert (like /android.html) is generated for
#Bitcoin Core non-clickable alerts.

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
        self.data['canonical'] = '/en/alert/' + src.split('.')[0]
      else
        self.data['category'] = 'alert'
        if self.data.has_key?('banner') and !self.data['banner'].nil? and self.data['banner'].length>0
          site.config['ALERT']='<a href="/'+dstdir+'/'+dst.gsub('.html','')+'">'+self.data['banner']+'</a>'
        end
        if self.data.has_key?('alias')
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', self.data['alias']+'.html', date)
          #FIXME temporary workaround to redirect /heartbleed/ to the appropriate alert page.
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', self.data['alias']+'/index.html', date)
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
