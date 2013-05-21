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
            next if locs[lang]['url'][id].nil?
            sitemap.puts '<url>'
            sitemap.puts '  <loc>http://bitcoin.org/'+lang+'/'+locs[lang]['url'][id]+'</loc>'
            locs.each do |altlang,value|
              next if locs[altlang]['url'][id].nil? or altlang == lang
              sitemap.puts '  <xhtml:link'
              sitemap.puts '    rel="alternate"'
              sitemap.puts '    hreflang="'+altlang+'"'
              sitemap.puts '    href="http://bitcoin.org/'+altlang+'/'+locs[altlang]['url'][id]+'" />'
            end
            sitemap.puts '</url>'
          end
        end
	#Add static non-translated pages
        Dir.foreach('.') do |file1|
          if /^[a-z]{2}(_[A-Z]{2})?$/.match(file1) and File.directory?(file1)
            Dir.foreach(file1) do |file2|
              next if !/\.html$/.match(file2)
              sitemap.puts '<url>'
              sitemap.puts '  <loc>http://bitcoin.org/'+file1+'/'+file2+'</loc>'
              sitemap.puts '</url>'
            end
          end
          next if !/\.html$/.match(file1)
          sitemap.puts '<url>'
          sitemap.puts '  <loc>http://bitcoin.org/'+file1+'</loc>'
          sitemap.puts '</url>'
        end
        #Add posts
        site.posts.each do |post|
          sitemap.puts '<url>'
          sitemap.puts '  <loc>http://bitcoin.org'+post.url+'</loc>'
          sitemap.puts '</url>'
        end
        #Close sitemap
        sitemap.puts '</urlset>'
      end
      site.static_files << SitemapFile.new(site, site.source, '', 'sitemap.xml')

    end
  end

end
