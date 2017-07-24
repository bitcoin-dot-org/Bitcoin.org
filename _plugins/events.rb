# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#events.rb sets the site.conferences array based
#on events in _events/
#This is later used to populate the events map and display the
#list in chronological order, in the RSS file and events pages.

require 'open-uri'
require 'json'
require 'date'
require 'yaml'
require 'cgi'

module Jekyll

  class EventPageGenerator < Generator

    def conferences
      conferences = []
      # Loop in _events.yml
      YAML.load_file('_events.yml').each do |data|
        # Skip event if it has started more than five days ago
	date = data['date'].to_s.split('-')
        next if Time.new.to_i > (Time.new(date[0].to_i,date[1].to_i,date[2].to_i).to_i + 432000)
        # Get geolocalisation data from Google Maps
        if data.has_key?('address')
          begin
            geoloc = JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=" + CGI::escape(data['address'] + ', ' + data['city'] + ', ' + data['country']) + "&sensor=false","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
            if geoloc['status'] == 'OK'
              data['geoloc'] = {'lat' => geoloc['results'][0]['geometry']['location']['lat'].to_s, 'lon' => geoloc['results'][0]['geometry']['location']['lng'].to_s}
            end
          rescue
            print 'Google Maps API Call Failed!'
          end
        end
        # Populate conferences array
        conferences.push(data)
      end
      return conferences
    end

    def generate(site)
      # Set site.meetups and site.conferences global variables for liquid/jekyll
      if ! site.respond_to?('conferences')
        class << site
          attr_accessor :meetups, :conferences
          alias event_site_payload site_payload
          def site_payload
            h = event_site_payload
            payload = h["site"]
            payload["conferences"] = self.conferences
            h["site"] = payload
            h
          end
        end
      end

      # Set site.conferences array
      site.conferences = {}

      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('events').nil?
        print 'Events disabled' + "\n"
        return
      end

      ## Create cache directory if it doesn't exist
      if !File.exists?('_cache')
        Dir.mkdir('_cache')
      end

      ## Populate site.conferences with conferences from _events.yml
      ## plus geodata from Google. Store data in the cache and only
      ## re-retrieve the geodata if _events.yml is edited or the cache
      ## file is deleted.
      conferences_cache = '_cache/conferences.marshall'
      events_file = '_events.yml'

      events_file_unix_time = File.stat(events_file).mtime.to_i
      if File.exists?(conferences_cache)
        conferences_cache_unix_time = File.stat(conferences_cache).mtime.to_i
      else
        conferences_cache_unix_time = 0
      end

      if events_file_unix_time >= conferences_cache_unix_time
        site.conferences = conferences()
        File.open(conferences_cache,'w') do |file|
          Marshal.dump(site.conferences, file)
        end
      else
        File.open(conferences_cache,'r') do |file|
          site.conferences = Marshal.load(file)
        end
      end

    end

  end

end
