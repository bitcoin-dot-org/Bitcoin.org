# frozen_string_literal: false

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# contributors.rb fetches Bitcoin Core contributors list and set
# site.contributors array. This is later used to display the
# list of contributors on the "Development" page.

require 'open-uri'
require 'json'

module Jekyll
  class CategoryGenerator < Generator
    def contributors(repo, aliases)
      contributors = []
      # Call GitHub API with 100 results per page
      page = 1
      data = []
      while page < 10
        begin
          # rubocop:disable Security/Open
          ar = JSON.parse(
            open('https://api.github.com/repos/' + repo +
                 "/contributors?page=#{page}&per_page=100",
                 'User-Agent' => "Ruby/#{RUBY_VERSION}")
                  .read
          )
          # rubocop:enable Security/Open
          # Prevent any error to stop the build process, return an empty array instead
        rescue StandardError
          print 'GitHub API Call Failed!'
          break
        end
        unless ar.is_a?(Array)
          print 'GitHub API Call Failed!'
          return contributors
        end
        if ar.length > 100
          print 'GitHub API exceeding the 100 results limit!'
          return contributors
        end
        # Stop calling GitHub API when no new results are returned
        break if ar.empty?

        # Merge contributors into a single array
        data.push(*ar)
        page += 1
      end
      # Loop in returned results array
      result = {}
      data.each do |c|
        # Skip incomplete / invalid data and set contributor's name
        next unless c.is_a?(Hash)
        next if !c.key?('contributions') || !c['contributions'].is_a?(Integer) || (c['contributions'] > 1_000_000)

        if c.key?('name') && c['name'].is_a?(String) && /^[A-Za-z0-9\-]{1,150}$/.match(c['name'])
          name = c['name']
        elsif c.key?('login') && c['login'].is_a?(String) && /^[A-Za-z0-9\-]{1,150}$/.match(c['login'])
          name = c['login']
        else
          next
        end
        # Replace name by its corresponding alias if defined in _config.yml
        name = aliases[name] if aliases.key?(name)
        # Assign variables
        x = {}
        x['name'] = name
        x['contributions'] = c['contributions']
        # Set login when available
        if c.key?('login') && c['login'].is_a?(String) && /^[A-Za-z0-9\-]{1,150}$/.match(c['login'])
          x['login'] = c['login']
        end
        # Add new contributor to the array, or increase contributions if it already exists
        if result.key?(name)
          result[name]['contributions'] += x['contributions']
        else
          result[name] = x
        end
      end
      # Generate final ordered contributors array
      result.each do |_key, value|
        contributors.push(value)
      end
      contributors.sort_by { |c| - c['contributions'] }
    end

    def generate(site)
      # Set site.contributors global variables for liquid/jekyll
      unless site.respond_to?('core_contributors')
        class << site
          attr_accessor :core_contributors
          attr_accessor :site_contributors

          alias_method :contrib_site_payload, :site_payload
          def site_payload
            h = contrib_site_payload
            payload = h['site']
            payload['core_contributors'] = core_contributors
            payload['site_contributors'] = site_contributors
            h['site'] = payload
            h
          end
        end
      end

      # Set site.core_contributors and site.site_contributors Hashes
      site.core_contributors = {}
      site.site_contributors = {}

      # Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? && ENV['ENABLED_PLUGINS'].index('contributors').nil?
        print 'Contributors disabled' + "\n"
        return
      end

      ## Create cache directory if it doesn't exist
      Dir.mkdir('_cache') unless File.exist?('_cache')

      # Populate site.core_contributors and site.site_contributors with
      # data from GitHub.com. Store data in the cache and only
      # re-retrieve the data if 86,400 seconds (24 hours) passes from
      # the retrieval date or if the cache file is deleted.  For
      # simplicity, updates on the two cache files are linked, so if one
      # file has to be updated, they both get updated.
      corecontributors_cache = '_cache/core_contributors.marshall'
      sitecontributors_cache = '_cache/site_contributors.marshall'
      if File.exist?(corecontributors_cache) && File.exist?(sitecontributors_cache)
        corecontributors_cache_age = (Time.now - File.stat(corecontributors_cache).mtime).to_i
        sitecontributors_cache_age = (Time.now - File.stat(sitecontributors_cache).mtime).to_i
      else
        corecontributors_cache_age = Time.now.to_i
        sitecontributors_cache_age = Time.now.to_i
      end

      # rubocop:disable Security/MarshalLoad
      if corecontributors_cache_age > 86_400 || sitecontributors_cache_age > 86_400
        site.core_contributors = contributors('bitcoin/bitcoin', site.config['aliases'])
        File.open(corecontributors_cache, 'w') do |file|
          Marshal.dump(site.core_contributors, file)
        end
        site.site_contributors = contributors('bitcoin-dot-org/bitcoin.org', site.config['aliases'])
        File.open(sitecontributors_cache, 'w') do |file|
          Marshal.dump(site.site_contributors, file)
        end
      else
        File.open(corecontributors_cache, 'r') do |file|
          site.core_contributors = Marshal.load(file)
        end
        File.open(sitecontributors_cache, 'r') do |file|
          site.site_contributors = Marshal.load(file)
        end
      end
      # rubocop:enable Security/MarshalLoad
    end
  end
end
