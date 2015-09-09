# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#sitemap.rb generates a sitemap.xml file, which also includes
#alternate hreflang for each translated version of each page.

require 'yaml'
require 'cgi'

module Jekyll

  class SitemapFile < StaticFile
    def write(dest)
      # do nothing
    end
  end

  class SitemapGenerator < Generator
    def generate(site)
      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('sitemap').nil?
        print 'Sitemap disabled' + "\n"
        return
      end
      #Load translations
      locs = {}
      enabled = ENV['ENABLED_LANGS'];
      enabled = enabled.split(' ') if !enabled.nil?
      Dir.foreach('_translations') do |file|
        next if file == '.' or file == '..' or file == 'COPYING'
        lang=file.split('.')[0]
        #Ignore lang if disabled
        if lang != 'en' and !enabled.nil? and !enabled.include?(lang)
          next
        end
        locs[lang] = YAML.load_file('_translations/'+file)[lang]
      end
      #Create destination directory if does not exists
      if !File.directory?(site.dest)
        Dir.mkdir(site.dest)
      end
      File.open(File.join(site.dest, 'sitemap.xml'), 'w+') do |sitemap|
        #Open sitemap
        sitemap.puts '<?xml version="1.0" encoding="UTF-8"?>'
        sitemap.puts '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
        sitemap.puts '	xmlns:xhtml="http://www.w3.org/1999/xhtml">'
        #Add translated pages with their alternative in each languages
        locs['en']['url'].each do |id,value|
          locs.each do |lang,value|
            #Don't add a page if their url is not translated
            next if locs[lang]['url'][id].nil? or locs[lang]['url'][id] == ''
            sitemap.puts '<url>'
            sitemap.puts '  <loc>https://bitcoin.org/'+lang+'/'+CGI::escape(locs[lang]['url'][id])+'</loc>'
            locs.each do |altlang,value|
              next if locs[altlang]['url'][id].nil? or locs[altlang]['url'][id] == '' or altlang == lang
              sitemap.puts '  <xhtml:link'
              sitemap.puts '    rel="alternate"'
              sitemap.puts '    hreflang="'+altlang+'"'
              sitemap.puts '    href="https://bitcoin.org/'+altlang+'/'+CGI::escape(locs[altlang]['url'][id])+'" />'
            end
            sitemap.puts '</url>'
          end
        end
	#Add static non-translated pages
        Dir.glob('en/**/*.{md,html}').concat(Dir.glob('*.{md,html}')).each do |file|
          next if file == 'index.html' or file == '404.html' or file == 'README.md'
          #Ignore google webmaster tools
          data = File.read(file)
          next if !data.index('google-site-verification:').nil?
          sitemap.puts '<url>'
          sitemap.puts '  <loc>https://bitcoin.org/'+file.gsub('.html','').gsub('.md','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add alerts pages
        Dir.foreach('_alerts') do |file|
          next if file == '.' or file == '..'
          sitemap.puts '<url>'
          sitemap.puts '  <loc>https://bitcoin.org/en/alert/'+file.gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add releases pages
        Dir.foreach('_releases') do |file|
          next if file == '.' or file == '..'
          file = file.split('-')
          next if file.length < 4
          file.shift()
          file.shift()
          file.shift()
          file = file.join('-')
          sitemap.puts '<url>'
          sitemap.puts '  <loc>https://bitcoin.org/en/release/'+file.gsub('.md','').gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Close sitemap
        sitemap.puts '</urlset>'
      end
      site.static_files << SitemapFile.new(site, site.source, '', 'sitemap.xml')
    end
  end

end
