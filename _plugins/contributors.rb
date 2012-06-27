require 'open-uri'
require 'json'
require 'aquarium'
require 'yaml'

module Jekyll

	class CategoryGenerator < Generator
		def fetch_contributors
			contributors = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/contributors").read)

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
			@contributors = merge_contributors(fetch_contributors(), site.config['aliases']).sort_by{|c| - c['contributions']}
			@primary_devs = JSON.parse(open("https://api.github.com/repos/bitcoin/bitcoin/collaborators").read)

			Aquarium::Aspects::Aspect.new :around, :invoking => :site_payload, :on_type => Site do |execution_point, site, *args|
				result = execution_point.proceed
				result['site']['project'] = {
						"primary_devs" => @primary_devs,
						"contributors" => @contributors
					}
				result
			end

  	end

	end

end
