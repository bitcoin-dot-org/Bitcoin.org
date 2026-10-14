# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# sitemap.rb generates the sitemap.xml file from the pages that were
# actually generated, after all page generators have run.
# Translated alternatives are declared in each page's HTML head.

require 'cgi'

module Jekyll

  class SitemapFile < StaticFile
    def write(dest)
      # Do nothing. The sitemap is written by SitemapGenerator.
    end
  end

  class SitemapGenerator < Generator
    priority :lowest

    def generate(site)
      # Do nothing if the plugin is disabled.
      if !ENV['ENABLED_PLUGINS'].nil? &&
         ENV['ENABLED_PLUGINS'].index('sitemap').nil?
        puts 'Sitemap disabled'
        return
      end

      origin = 'https://bitcoin.org'

      entries = site.pages
                    .select { |page| indexable?(page) }
                    .map { |page| origin + public_path(page.url) }

      # Standalone, indexable files deployed outside the Jekyll build.
      standalone_files = [
        'bitcoin.pdf'
      ]
      standalone_files.each do |file|
        entries << "#{origin}/#{file}"
      end

      entries = entries.uniq.sort

      Dir.mkdir(site.dest) unless File.directory?(site.dest)
      File.open(File.join(site.dest, 'sitemap.xml'), 'w+') do |sitemap|
        sitemap.puts '<?xml version="1.0" encoding="UTF-8"?>'
        sitemap.puts '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        entries.each do |url|
          sitemap.puts '<url>'
          sitemap.puts "  <loc>#{url}</loc>"
          sitemap.puts '</url>'
        end
        sitemap.puts '</urlset>'
      end

      site.static_files << SitemapFile.new(site, site.source, '', 'sitemap.xml')
    end

    private

    def indexable?(page)
      # Redirect stubs point elsewhere and should not be indexed.
      return false if page.data['redirect']
      # Only pages rendered as HTML belong in the sitemap.
      return false unless page.output_ext == '.html'
      return false if page.name == '404.html'
      # Google webmaster verification files.
      return false if page.content.to_s.include?('google-site-verification:')
      true
    end

    def public_path(url)
      path = url.to_s
      path = "/#{path}" unless path.start_with?('/')
      path = path.sub(%r{/index\.html$}, '/')
                 .sub(/\.html$/, '')
      path.split('/', -1)
          .map { |segment| CGI.escape(segment).gsub('+', '%20') }
          .join('/')
    end
  end

end
