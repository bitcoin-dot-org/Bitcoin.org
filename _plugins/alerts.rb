# frozen_string_literal: false

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# alerts.rb generates alert pages using files in _alerts
# and assign them the 'alert' category.

# This is later used to loop through site.pages in order
# to display the alert's list in chronological order, both
# on the "Alerts" page and RSS file.

# If "banner" variable is set in one alert file, site.ALERT
# variable is set, allowing a clickable alert banner to be
# displayed in _layouts/base.html .

# If "shorturl" variable is set in one alert file, a short alias
# file for the alert (like /android.html) is generated for
# Bitcoin Core non-clickable alerts.

require 'yaml'

module Jekyll
  class AlertPage < Page
    def initialize(site, base, lang, srcdir, src, dstdir, dst, date)
      @site = site
      @base = base
      @dir = '/' + dstdir
      @name = dst
      extension = dst.split('.').last
      process(dst)
      read_yaml(File.join(base, srcdir), src)
      data['lang'] = lang
      data['date'] = date
      data['path'] = srcdir + '/' + src
      data['layout'] = 'alert'
      if dstdir.empty?
        data['canonical'] = '/en/alert/' + src.split('.').first
      else
        data['category'] = 'alert'
        # rubocop:disable Style/SafeNavigation
        if data['banner'] && data['banner'].length.positive?
          site.config['ALERT'] = data['banner']
          site.config['ALERTURL'] = '/' + dstdir + '/' + dst.gsub('.html', '').gsub('.md', '')
          site.config['ALERTCLASS'] = data['bannerclass'] if
            data['bannerclass'] && data['bannerclass'].length.positive?
        end
        # rubocop:enable Style/SafeNavigation
        site.config['STATUS'] = 1 if data['active'] == true
        if data.key?('shorturl')
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', data['shorturl'] + '.' + extension, date)
          site.pages << AlertPage.new(site, base, lang, srcdir, src, '', data['shorturl'] + '/index.' + extension, date)
        end
      end
    end
  end

  class AlertPageGenerator < Generator
    def generate(site)
      # Generate each alert based on templates
      site.config['STATUS'] = 0
      site.config['ALERTCLASS'] = 'alert'
      # Do nothing if plugin is disabled
      if ENV['ENABLED_PLUGINS'] && ENV['ENABLED_PLUGINS'].index('alerts').nil?
        puts 'Alerts disabled'
        return
      end
      Dir.foreach('_alerts') do |file|
        next if ['.', '..'].include? file

        lang = 'en'
        src = file
        dst = file
        dstdir = lang + '/alert'
        date = dst.split('-')
        next if date.length < 4

        date = date[0] + '-' + date[1] + '-' + date[2]
        next unless /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.match(date)

        site.pages << AlertPage.new(site, site.source, lang, '_alerts', src, dstdir, dst, date)
      end
      # "TODO" alerts are only generated for the English language,
      # but they could also be translated at some point. They would however
      # need to fallback to English when no translation is available.
    end
  end
end
