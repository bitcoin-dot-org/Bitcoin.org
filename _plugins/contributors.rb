# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#contributors.rb fetches Bitcoin Core contributors list and set
#site.contributors array. This is later used to display the
#list of contributors on the "Development" page.

require 'open-uri'
require 'json'

module Jekyll

  class CategoryGenerator < Generator

    def contributors(repo, aliases)
      contributors = []
      # Call GitHub API with 100 results per page
      page = 1
      data = []
      while page < 10 do
        begin
          ar = JSON.parse(open("https://api.github.com/repos/"+repo+"/contributors?page=#{page}&per_page=100","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
        # Prevent any error to stop the build process, return an empty array instead
        rescue
          print 'GitHub API Call Failed!'
          break
        end
        if !ar.is_a?(Array)
          print 'GitHub API Call Failed!'
          return contributors
        end
        if ar.length > 100
          print 'GitHub API exceeding the 100 results limit!'
          return contributors
        end
        # Stop calling GitHub API when no new results are returned
        break if (ar.length == 0)
        # Merge contributors into a single array
        data.push(*ar)
        page += 1
      end
      # Loop in returned results array
      result = {}
      for c in data
        # Skip incomplete / invalid data and set contributor's name
        next if !c.is_a?(Hash)
        next if !c.has_key?('contributions') or !c['contributions'].is_a?(Integer) or c['contributions'] > 1000000
        if c.has_key?('name') and c['name'].is_a?(String) and /^[A-Za-z0-9\-]{1,150}$/.match(c['name'])
          name = c['name']
        elsif c.has_key?('login') and c['login'].is_a?(String) and /^[A-Za-z0-9\-]{1,150}$/.match(c['login'])
          name = c['login']
        else
          next
        end
        # Replace name by its corresponding alias if defined in _config.yml
        name = aliases[name] if aliases.has_key?(name)
        # Assign variables
        x = {}
        x['name'] = name
        x['contributions'] = c['contributions']
        # Set login when available
        if c.has_key?('login') and c['login'].is_a?(String) and /^[A-Za-z0-9\-]{1,150}$/.match(c['login'])
          x['login'] = c['login']
        end
        # Add new contributor to the array, or increase contributions if it already exists
        if result.has_key?(name)
          result[name]['contributions'] += x['contributions']
        else
          result[name] = x
        end
      end
      # Generate final ordered contributors array
      result.each do |key, value|
        contributors.push(value)
      end
      contributors.sort_by{|c| - c['contributions']}
    end

    def generate(site)
      # Set site.contributors global variables for liquid/jekyll
      if ! site.respond_to?('corecontributors')
        class << site
          attr_accessor :corecontributors
          attr_accessor :sitecontributors
          alias contrib_site_payload site_payload
          def site_payload
            h = contrib_site_payload
            payload = h["site"]
            payload["corecontributors"] = self.corecontributors
            payload["sitecontributors"] = self.sitecontributors
            h["site"] = payload
            h
          end
        end
      end

      # Set site.corecontributors and site.sitecontributors arrays
      site.corecontributors = {}
      site.sitecontributors = {}

      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('contributors').nil?
        print 'Contributors disabled' + "\n"
        return
      end

      ## Create cache directory if it doesn't exist
      if !File.exists?('_cache')
        Dir.mkdir('_cache')
      end

      # Populate site.corecontributors and site.sitecontributors with
      # data from GitHub.com. Store data in the cache and only
      # re-retrieve the data if 86,400 seconds (24 hours) passes from
      # the retrieval date or if the cache file is deleted.  For
      # simplicity, updates on the two cache files are linked, so if one
      # file has to be updated, they both get updated.
      corecontributors_cache = '_cache/corecontributors.marshall'
      sitecontributors_cache = '_cache/sitecontributors.marshall'
      if File.exists?(corecontributors_cache) && File.exists?(sitecontributors_cache)
        corecontributors_cache_age = (Time.now - File.stat(corecontributors_cache).mtime).to_i
        sitecontributors_cache_age = (Time.now - File.stat(sitecontributors_cache).mtime).to_i
      else
        corecontributors_cache_age = Time.now.to_i
        sitecontributors_cache_age = Time.now.to_i
      end

      if corecontributors_cache_age > 86400 || sitecontributors_cache_age > 86400
        site.corecontributors = contributors('bitcoin/bitcoin',site.config['aliases'])
        File.open(corecontributors_cache,'w') do |file|
          Marshal.dump(site.corecontributors, file)
        end
        site.sitecontributors = contributors('bitcoin-dot-org/bitcoin.org',site.config['aliases'])
        File.open(sitecontributors_cache,'w') do |file|
          Marshal.dump(site.sitecontributors, file)
        end
      else
        File.open(corecontributors_cache,'r') do |file|
          site.corecontributors = Marshal.load(file)
        end
        File.open(sitecontributors_cache,'r') do |file|
          site.sitecontributors = Marshal.load(file)
        end
      end

    end

  end

end
