# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# sitemap.rb generates the sitemap.xml file.
# Translated alternatives are declared in each page's HTML head.

require 'yaml'
require 'cgi'

module Jekyll

  class SitemapFile < StaticFile
    def write(dest)
      # Do nothing. The sitemap is written by SitemapGenerator.
    end
  end

  class SitemapGenerator < Generator
    def generate(site)
      # Do nothing if the plugin is disabled.
      if !ENV['ENABLED_PLUGINS'].nil? &&
         ENV['ENABLED_PLUGINS'].index('sitemap').nil?
        puts 'Sitemap disabled'
        return
      end

      # Load translations.
      locs = {}

      enabled = ENV['ENABLED_LANGS']
      enabled = enabled.split(' ') unless enabled.nil?

      Dir.foreach('_translations') do |file|
        next if file == '.'
        next if file == '..'
        next if file == 'COPYING'

        lang = file.split('.')[0]

        # Ignore the language if it is disabled.
        if lang != 'en' &&
           !enabled.nil? &&
           !enabled.include?(lang)
          next
        end

        translation_file = File.join('_translations', file)
        locs[lang] = YAML.unsafe_load_file(translation_file)[lang]
      end

      # Create the destination directory if it does not exist.
      Dir.mkdir(site.dest) unless File.directory?(site.dest)

      sitemap_path = File.join(site.dest, 'sitemap.xml')

      File.open(sitemap_path, 'w+') do |sitemap|
        # Open the sitemap.
        sitemap.puts '<?xml version="1.0" encoding="UTF-8"?>'
        sitemap.puts '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

        # Add translated pages as normal sitemap URLs.
        #
        # hreflang links are generated in each page's HTML head instead
        # of being duplicated in the sitemap.
        locs['en']['url'].each_key do |id|
          locs.each_key do |lang|
            translated_url = locs[lang]['url'][id]

            # Do not add a page if its URL is not translated.
            next if translated_url.nil? || translated_url.empty?

            sitemap.puts '<url>'
            sitemap.puts(
              '  <loc>https://bitcoin.org/' +
              lang + '/' +
              CGI::escape(translated_url) +
              '</loc>'
            )
            sitemap.puts '</url>'
          end
        end

        # Add static non-translated pages.
        static_pages = Dir.glob('en/**/*.{md,html}')
        static_pages.concat(Dir.glob('*.{md,html}'))

        static_pages.each do |file|
          next if file == 'index.html'
          next if file == '404.html'
          next if file == 'README.md'

          # Ignore Google webmaster verification files.
          data = File.read(file)
          next unless data.index('google-site-verification:').nil?

          public_path = file
                        .gsub('.html', '')
                        .gsub('.md', '')

          sitemap.puts '<url>'
          sitemap.puts(
            '  <loc>https://bitcoin.org/' +
            public_path +
            '</loc>'
          )
          sitemap.puts '</url>'
        end

        # Add alert pages.
        Dir.foreach('_alerts') do |file|
          next if file == '.'
          next if file == '..'

          alert_path = file
                       .gsub('.html', '')
                       .gsub('.md', '')

          sitemap.puts '<url>'
          sitemap.puts(
            '  <loc>https://bitcoin.org/en/alert/' +
            alert_path +
            '</loc>'
          )
          sitemap.puts '</url>'
        end

        # Add release pages.
        Dir.foreach('_releases') do |file|
          next if file == '.'
          next if file == '..'

          release_parts = file.split('-')
          next if release_parts.length < 4

          # Remove the YYYY-MM-DD date prefix.
          release_parts.shift
          release_parts.shift
          release_parts.shift

          release_path = release_parts
                         .join('-')
                         .gsub('.md', '')
                         .gsub('.html', '')

          sitemap.puts '<url>'
          sitemap.puts(
            '  <loc>https://bitcoin.org/en/release/' +
            release_path +
            '</loc>'
          )
          sitemap.puts '</url>'
        end

        # Close the sitemap.
        sitemap.puts '</urlset>'
      end

      site.static_files << SitemapFile.new(
        site,
        site.source,
        '',
        'sitemap.xml'
      )
    end
  end

end
