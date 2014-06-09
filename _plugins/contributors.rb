#contributors.rb fetches Bitcoin Core contributors list and set
#site.contributors array. This is later used to display the
#list of contributors on the "Development" page.

require 'open-uri'
require 'json'

module Jekyll

  class CategoryGenerator < Generator

    def contributors(aliases)
      contributors = []
      # Call GitHub API with 100 results per page
      page = 1
      data = []
      while page < 10 do
        begin
          ar = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/contributors?page=#{page}&per_page=100","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
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
        # Set gravatar_id when available
        if c.has_key?('gravatar_id') and c['gravatar_id'].is_a?(String) and /^[A-Za-z0-9\-]{1,150}$/.match(c['gravatar_id'])
          x['gravatar_id'] = c['gravatar_id']
        end
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
      class << site
        attr_accessor :contributors
        alias contrib_site_payload site_payload
        def site_payload
          h = contrib_site_payload
          payload = h["site"]
          payload["contributors"] = self.contributors
          h["site"] = payload
          h
        end
      end
      # Populate site.contributors array
      site.contributors = contributors(site.config['aliases'])
    end

  end

end
