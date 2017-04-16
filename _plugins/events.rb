# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#events.rb set site.conferences and site.meetups arrays based
#on events in _events/ and meetups on bitcoin.meetups.com .
#This is later used to populate the events map and display the
#list in chronological order, in the RSS file and events pages.

require 'open-uri'
require 'json'
require 'date'
require 'yaml'
require 'cgi'

module Jekyll

  class EventPageGenerator < Generator

    def meetups
      meetups = []
      # Call Meetup API with a key-signed request
      begin
        data = JSON.parse(open("http://api.meetup.com/2/open_events?omit=description&status=upcoming&radius=25.0&topic=bitcoin&and_text=False&limited_events=False&desc=False&offset=0&format=json&page=500&time=0m%2C3m&sig_id=133622112&sig=cd874bc2c84f96d989f823880889bda2f5e4cdc5","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
      # Prevent any error to stop the build process, return an empty array instead
      rescue
        print 'Meetup API Call Failed!'
        return meetups
      end
      if !data.is_a?(Hash) or !data.has_key?('results') or !data['results'].is_a?(Array)
        print 'Meetup API Call Failed!'
        return meetups
      end
      if data['results'].length > 1000
        print 'Meetup API exceeding the 1000 results limit!'
        return meetups
      end
      # Loop in returned results array
      for m in data['results']
        # Skip meetups with incomplete data
        next if !m.has_key?('time') or ( !m['time'].is_a?(String) and !m['time'].is_a?(Integer) and !m['time'].is_a?(Float) )
        next if !m.has_key?('utc_offset') or ( !m['utc_offset'].is_a?(String) and !m['utc_offset'].is_a?(Integer) and !m['utc_offset'].is_a?(Float) )
        next if !m.has_key?('group') or !m['group'].is_a?(Hash)
        next if !m['group'].has_key?('name') or ( !m['group']['name'].is_a?(String) and !m['group']['name'].is_a?(Integer) and !m['group']['name'].is_a?(Float) )
        next if !m.has_key?('venue') or !m['venue'].is_a?(Hash)
        next if !m['venue'].has_key?('name') or ( !m['venue']['name'].is_a?(String) and !m['venue']['name'].is_a?(Integer) and !m['venue']['name'].is_a?(Float) )
        next if !m['venue'].has_key?('address_1') or ( !m['venue']['address_1'].is_a?(String) and !m['venue']['address_1'].is_a?(Integer) and !m['venue']['address_1'].is_a?(Float) )
        next if !m['venue'].has_key?('city') or ( !m['venue']['city'].is_a?(String) and !m['venue']['city'].is_a?(Integer) and !m['venue']['city'].is_a?(Float) )
        next if !m['venue'].has_key?('country') or ( !m['venue']['country'].is_a?(String) and !m['venue']['country'].is_a?(Integer) and !m['venue']['country'].is_a?(Float) )
        next if !m['venue'].has_key?('lat') or ( !m['venue']['lat'].is_a?(String) and !m['venue']['lat'].is_a?(Integer) and !m['venue']['lat'].is_a?(Float) )
        next if !m['venue'].has_key?('lon') or ( !m['venue']['lon'].is_a?(String) and !m['venue']['lon'].is_a?(Integer) and !m['venue']['lon'].is_a?(Float) )
        next if !m.has_key?('event_url') or ( !m['event_url'].is_a?(String) and !m['event_url'].is_a?(Integer) and !m['event_url'].is_a?(Float) )
        # Assign variables
        time = m['time'].to_s
        utcoffset = m['utc_offset'].to_s
        title = m['group']['name'].to_s
        venue = m['venue']['name'].to_s
        address = m['venue']['address_1'].to_s
        city = m['venue']['city'].to_s
        country = m['venue']['country'].to_s
        link = m['event_url'].to_s
        lat = m['venue']['lat'].to_s
        lon = m['venue']['lon'].to_s
        # Skip meetups with malformed data
        next if !/^[0-9]{1,15}$/.match(time)
        next if !/^-?[0-9]{1,10}$/.match(utcoffset)
        next if !/^.{1,150}$/.match(title)
        next if !/^.{1,150}$/.match(venue)
        next if !/^.{1,150}$/.match(address)
        next if !/^.{1,150}$/.match(city)
        next if !/^[a-zA-Z]{2}$/.match(country)
        next if !/^http:\/\/www.meetup.com\/.{1,150}$/.match(link)
        next if !/^-?[0-9]{1,2}(\.[0-9]{1,15})?$/.match(lat) or ( lat.to_f < -90 and lat.to_f > 90 )
        next if !/^-?[0-9]{1,3}(\.[0-9]{1,15})?$/.match(lon) or ( lon.to_f < -180 and lon.to_f > 180 )
        next if lon.to_f == 0 and lat.to_f == 0
	# Ignore events that don't mention "Bitcoin" in their title
        next if !/bitcoin/i.match(title)
        # Format variables
        time = Time.at((time.to_i + utcoffset.to_i) / 1000)
        time.utc
        date = time.year.to_s + '-' + time.month.to_s.rjust(2,'0') + '-' + time.day.to_s.rjust(2,'0')
        country = country.upcase
        geoloc = {'lat' => lat, 'lon' => lon}
        # Use address_2 and state when available
        if m['venue'].has_key?('address_2') and ( m['venue']['address_2'].is_a?(String) or m['venue']['address_2'].is_a?(Integer) or m['venue']['address_2'].is_a?(Float) ) and /^.{1,150}$/.match(m['venue']['address_2'].to_s)
          address = address + ' ' + m['venue']['address_2'].to_s
        end
        if m['venue'].has_key?('state') and ( m['venue']['state'].is_a?(String) or m['venue']['state'].is_a?(Integer) or m['venue']['state'].is_a?(Float) ) and /^.{1,150}$/.match(m['venue']['state'].to_s)
          city = city + ', ' + m['venue']['state'].to_s
        end
        # Populate meetups array
        meetups.push({'date' => date, 'title' => title, 'venue' => venue, 'address' => address, 'city' => city, 'country' => country, 'link' => link, 'geoloc' => geoloc})
      end
      return meetups
    end

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
            address = [data['address'], data['city'], data['country']].reject(&:nil?).join(', ')
            geoloc = JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=" + CGI::escape(address) + "&sensor=false","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
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
      class << site
        attr_accessor :meetups, :conferences
        alias event_site_payload site_payload
        def site_payload
          h = event_site_payload
          payload = h["site"]
          payload["meetups"] = self.meetups
          payload["conferences"] = self.conferences
          h["site"] = payload
          h
        end
      end

      # Set site.conferences and site.meetups arrays
      site.conferences = {}
      site.meetups = {}

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

      # Populate site.meetups with data from Meetup.com.  Store data in
      # the cache and only re-retrieve the data if 86,400 seconds (24
      # hours) passes from the retrieval date or if the cache file is
      # deleted.
      meetups_cache = '_cache/meetups.marshall'
      if File.exists?(meetups_cache)
        meetups_cache_age = (Time.now - File.stat(meetups_cache).mtime).to_i
      else
        meetups_cache_age = Time.now.to_i
      end

      if meetups_cache_age > 86400
        site.meetups = meetups()
        File.open(meetups_cache,'w') do |file|
          Marshal.dump(site.meetups, file)
        end
      else
        File.open(meetups_cache,'r') do |file|
          site.meetups = Marshal.load(file)
        end
      end

    end

  end

end
