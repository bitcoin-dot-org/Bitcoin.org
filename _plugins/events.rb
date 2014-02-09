#events.rb generates blank hidden event pages using files
#in _events and assign them the 'event' category.

#This is later used to loop through site.pages in order
#to display the event's list in chronological order, both
#on the events RSS file and translated events pages.

require 'yaml'
require 'cgi'

module Jekyll

  class EventPage < Page
    def initialize(site, base, srcdir, src, dstdir, dst, date)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['date'] = date
      self.data['category'] = 'event'
      # Get longitude / latitude from Google Geocoding API
      self.data['geoloc'] = 'false'
      address = CGI::escape(self.data['address'] + ', ' +self.data['city'] + ', ' + self.data['country'])
      geoloc = JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
      if geoloc['status'] == 'OK'
        self.data['geoloc'] = geoloc['results'][0]['geometry']['location']['lat'].to_s + ", " + geoloc['results'][0]['geometry']['location']['lng'].to_s
      end
    end
  end

  class EventPageGenerator < Generator
    def generate(site)
      Dir.foreach('_events') do |file|
        next if file == '.' or file == '..'
        date = file.split('-')
        next if date.length < 4
        date = date[0] + '-' + date[1] + '-' + date[2]
        next if !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.match(date)
        site.pages << EventPage.new(site, site.source, '_events', file, 'event', file, date)
      end
    end
  end

end
