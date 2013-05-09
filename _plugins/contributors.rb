require 'open-uri'
require 'json'
require 'yaml'

module Jekyll

	class CategoryGenerator < Generator
		def fetch_contributors
			contributors = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/contributors","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)

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
				attr_accessor :primary_devs, :contributors

				def site_payload
					result = super
					result['site']['project'] = {
							"primary_devs" => self.primary_devs,
							"contributors" => self.contributors
						}
					result
				end
			end

			site.primary_devs = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/collaborators","User-Agent"=>"Ruby/#{RUBY_VERSION}").read)
			site.contributors = merge_contributors(fetch_contributors(), site.config['aliases']).sort_by{|c| - c['contributions']}
		end

	end

end
