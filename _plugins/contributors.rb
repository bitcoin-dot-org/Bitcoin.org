#contributors.rb fetches Bitcoin Core contributors list and set
#site.contributors array. This is later used to display the
#list of contributors on the "Development" page.

require 'open-uri'
require 'json'
require 'yaml'

module Jekyll

  class CategoryGenerator < Generator
    def fetch_contributors
      page = 1
      contributors = []
      while page < 10 do
        begin
          ar = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/contributors?page=#{page}&per_page=100","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
        rescue
          print 'GitHub API Call Failed!'
          break
        end
        break if (ar.length == 0)
        contributors.push(*ar)
        page += 1
      end

      contributors.map do |x|
        x['name'] = x['login'] unless x.has_key?('name')
        x['name'] = x['login'] if x['name'] == ""

        x
      end
    end

    def merge_contributors(contributors, aliases)
      contributors = contributors.map do |c|
        c['name'] = aliases[c['name']] if aliases.has_key?(c['name'])

        c
      end

      hoaoh = contributors.reduce({}) do |result, item|
        result.merge({ item['name'] => [item] }) { |key, old, new| old[0]['contributions'] += new[0]['contributions']; old }
      end

      hoaoh.values.map { |sublist|
        sublist.reduce({}) do |merged,h|
          merged.merge(h) do |key,old,new| (key=='name' ? old : old+new) end
        end
      }.flatten
    end

    def generate(site)
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

      site.contributors = merge_contributors(fetch_contributors(), site.config['aliases']).sort_by{|c| - c['contributions']}
    end

  end

end
