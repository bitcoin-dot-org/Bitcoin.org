# frozen_string_literal: true

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
  puts 'Usage: comparelinks.rb oldbranch newbranch'
  exit
end

unless File.exist?('_config.yml')
  puts 'Wrong working directory.'
  exit
end

def fetchlinks
  # Fetch new list of links
  links = {}
  Dir.glob(WORKDIR + '/_site/**/*.html').each do |file|
    content = File.read(file)
    content.scan(/ href *= *"(.*?)"/).each do |link|
      link = link[0].to_s.gsub(%r{^(https?://(www\.)?bitcoin\.org)?/}, '/')
      next if link.match(%r{^#|^http://www.meetup.com/})

      unless link.match(%r{^https?://|^/[^/]|^mailto:})
        link = File.dirname(file.sub(WORKDIR + '/_site', '')) + '/' + File.basename(link)
      end
      links[link] = '0'
    end
    content.scan(/ src *= *"(.*?)"/).each do |link|
      link = link[0].to_s.gsub(%r{^(https?://(www\.)?bitcoin\.org)?/}, '/')
      links[link] = '0'
    end
  end

  links
end

Dir.mktmpdir do |workdir|
  WORKDIR = workdir.gsub("\n", '')

  # Copy current repository to a temporary directory
  `rsync -a ./ "#{WORKDIR}/"`

  # Build both version of the website and fetch all links
  oldlinks = {}
  newlinks = {}

  Dir.chdir(WORKDIR) do
    `git checkout #{srcbr}`
    `jekyll`
    oldlinks = fetchlinks

    `git checkout #{dstbr}`
    `jekyll`
    newlinks = fetchlinks
  end

  # Find added links, removed links
  diffaddlinks = []
  diffrmlinks = []
  newlinks.each do |link, _etag|
    next if oldlinks.key?(link)

    diffaddlinks.push(link)
  end
  oldlinks.each do |link, _etag|
    next if newlinks.key?(link)

    diffrmlinks.push(link)
  end

  # Display resulting diff
  diff = ''
  diff = diff + "## links added\n\n" + diffaddlinks.join("\n") + "\n\n" unless diffaddlinks.empty?
  diff = diff + "## links removed\n\n" + diffrmlinks.join("\n") + "\n\n" unless diffrmlinks.empty?
  print diff
end
