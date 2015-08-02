# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#alerts.rb generates alert pages using files in _alerts
#and assign them the 'alert' category.

#This is later used to loop through site.pages in order
#to display the alert's list in chronological order, both
#on the "Alerts" page and RSS file.

#If "banner" variable is set in one alert file, site.ALERT
#variable is set, allowing a clickable alert banner to be
#displayed in _layouts/base.html .

#If "shorturl" variable is set in one alert file, a short alias
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
      extension = dst.split('.')[-1]
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['lang'] = lang
      self.data['date'] = date
      self.data['path'] = srcdir+'/'+src
      self.data['layout'] = 'alert'
      if dstdir == ''
        self.data['canonical'] = '/en/alert/' + src.split('.')[0]
      else
        self.data['category'] = 'alert'
        if self.data.has_key?('banner') and !self.data['banner'].nil? and self.data['banner'].length>0
          site.config['ALERT']=self.data['banner']
          site.config['ALERTURL']='/'+dstdir+'/'+dst.gsub('.html','').gsub('.md','')
          if self.data.has_key?('bannerclass') and !self.data['bannerclass'].nil? and self.data['bannerclass'].length>0
            site.config['ALERTCLASS'] = self.data['bannerclass']
          end
        end
        if self.data.has_key?('active') and !self.data['active'].nil? and self.data['active'] == true
          site.config['STATUS'] = 1
        end
        if self.data.has_key?('shorturl')
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', self.data['shorturl']+'.'+extension, date)
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', self.data['shorturl']+'/index.'+extension, date)
        end
      end
    end
  end

  class AlertPageGenerator < Generator
    def generate(site)
      #Generate each alert based on templates
      site.config['STATUS'] = 0
      site.config['ALERTCLASS'] = 'alert'
      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('alerts').nil?
        print 'Alerts disabled' + "\n"
        return
      end
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
