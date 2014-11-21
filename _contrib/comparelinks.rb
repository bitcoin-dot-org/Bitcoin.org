# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## This script is used to compare all links between two branches of the
## website. Each branches are built and compared.

## Example: ruby ./_contrib/comparelinks.rb master newbranch > ../diff

require 'tmpdir'

def prompt(*args)
    print(*args)
    gets
end

if !ARGV.empty? && !ARGV[0].empty? && !ARGV[1].empty?
  srcbr = ARGV[0]
  dstbr = ARGV[1]
else
  print "Usage: comparelinks.rb oldbranch newbranch \n"
  exit
end

if !File.exist?('_config.yml')
  print "Wrong working directory. \n"
  exit
end

def fetchlinks()

	# Fetch new list of links
	links = {}
	dirs = Dir.glob(WORKDIR + "/_site/**/*.html").each { |file| 
		content = File.read(file)
		content.scan(/ href *= *"(.*?)"/).each { |link|
			link = link[0].to_s.gsub(/^(https?:\/\/(www\.)?bitcoin\.org)?\//,'/')
			next if (link.match(/^#|^http:\/\/www.meetup.com\//))
			if(!link.match(/^https?:\/\/|^\/[^\/]|^mailto:/))
				link = File.dirname(file.sub(WORKDIR + '/_site','')) + '/' + File.basename(link)
			end
			links[link] = "0"
		}
		content.scan(/ src *= *"(.*?)"/).each { |link|
			link = link[0].to_s.gsub(/^(https?:\/\/(www\.)?bitcoin\.org)?\//,'/')
			links[link] = "0"
		}
	}

	return links

end

Dir.mktmpdir{|workdir|

	WORKDIR=workdir.gsub("\n",'')

	# Copy current repository to a temporary directory
	`rsync -a ./ "#{WORKDIR}/"`

	# Build both version of the website and fetch all links
	oldlinks = {}
	newlinks = {}

	Dir.chdir(WORKDIR) do

		`git checkout #{srcbr}`
		`jekyll`
		oldlinks = fetchlinks()

		`git checkout #{dstbr}`
		`jekyll`
		newlinks = fetchlinks()

	end

	# Find added links, removed links
	diffaddlinks = []
	diffrmlinks = []
	newlinks.each { |link, etag|
		next if oldlinks.has_key?(link)
		diffaddlinks.push(link)
	}
	oldlinks.each { |link, etag|
		next if newlinks.has_key?(link)
		diffrmlinks.push(link)
	}

	# Display resulting diff
	diff = ''
	if diffaddlinks.length > 0
		diff = diff + "## links added\n\n" + diffaddlinks.join("\n") + "\n\n"
	end
	if diffrmlinks.length > 0
		diff = diff + "## links removed\n\n" + diffrmlinks.join("\n") + "\n\n"
	end
	print diff

}
