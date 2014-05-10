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
      #Load translations
      locs = {}
      Dir.foreach('_translations') do |file|
        next if file == '.' or file == '..'
        lang=file.split('.')[0]
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
        Dir.foreach('.') do |file1|
          if /^[a-z]{2}(_[A-Z]{2})?$/.match(file1) and File.directory?(file1)
            Dir.foreach(file1) do |file2|
              next if !/\.html$|\.md$/.match(file2)
              data = File.read(file1+'/'+file2)
              sitemap.puts '<url>'
              sitemap.puts '  <loc>https://bitcoin.org/'+file1+'/'+file2.gsub('.html','').gsub('.md','')+'</loc>'
              sitemap.puts '</url>'
            end
          end
          next if !/\.html$|\.md$/.match(file1)
          next if file1 == 'index.html'
          #Ignore google webmaster tools
          data = File.read(file1)
          next if !data.index('google-site-verification:').nil?
          sitemap.puts '<url>'
          sitemap.puts '  <loc>https://bitcoin.org/'+file1.gsub('.html','').gsub('.md','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add english alerts pages
        Dir.foreach('_alerts') do |file|
          next if file == '.' or file == '..'
          sitemap.puts '<url>'
          sitemap.puts '  <loc>https://bitcoin.org/en/alert/'+file.gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add english releases pages
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
