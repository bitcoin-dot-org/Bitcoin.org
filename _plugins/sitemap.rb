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
      #Load redirections
      redirects = YAML.load_file('_redirects.yml')['redirects']
      rredirects = {}
      redirects.each do |id,value|
        dst = value['dst']
        rredirects[dst] = id
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
            #Don't add a page if their url is not translated or if they are a redirection
            next if locs[lang]['url'][id].nil? or locs[lang]['url'][id] == ''
            next if redirects.has_key?(id) and ( !redirects[id].has_key?('except') or !redirects[id]['except'].has_key?(lang) )
            sitemap.puts '<url>'
            sitemap.puts '  <loc>http://bitcoin.org/'+lang+'/'+CGI::escape(locs[lang]['url'][id])+'</loc>'
            locs.each do |altlang,value|
              #Find appropriate alternative page even with redirections that are not fully deployed in translations
              altid = id
              if redirects.has_key?(id) and redirects[id].has_key?('except') and !redirects[id]['except'].has_key?(altlang)
                altid = redirects[id]['dst']
              end
              if rredirects.has_key?(id)
                altid = rredirects[id]
              end
              next if locs[altlang]['url'][altid].nil? or locs[altlang]['url'][altid] == '' or altlang == lang
              sitemap.puts '  <xhtml:link'
              sitemap.puts '    rel="alternate"'
              sitemap.puts '    hreflang="'+altlang+'"'
              sitemap.puts '    href="http://bitcoin.org/'+altlang+'/'+CGI::escape(locs[altlang]['url'][altid])+'" />'
            end
            sitemap.puts '</url>'
          end
        end
	#Add static non-translated pages
        Dir.foreach('.') do |file1|
          if /^[a-z]{2}(_[A-Z]{2})?$/.match(file1) and File.directory?(file1)
            Dir.foreach(file1) do |file2|
              next if !/\.html$/.match(file2)
              #Ignore static redirect pages
              data = File.read(file1+'/'+file2)
              next if !data.index('window.location.href=').nil?
              sitemap.puts '<url>'
              sitemap.puts '  <loc>http://bitcoin.org/'+file1+'/'+file2.gsub('.html','')+'</loc>'
              sitemap.puts '</url>'
            end
          end
          next if !/\.html$/.match(file1)
          next if file1 == 'index.html'
          #Ignore static redirect pages and google webmaster tools
          data = File.read(file1)
          next if !data.index('window.location.href=').nil? or !data.index('google-site-verification:').nil?
          sitemap.puts '<url>'
          sitemap.puts '  <loc>http://bitcoin.org/'+file1.gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add english alerts pages
        Dir.foreach('_alerts') do |file|
          next if file == '.' or file == '..'
          sitemap.puts '<url>'
          sitemap.puts '  <loc>http://bitcoin.org/en/alert/'+file.gsub('.html','')+'</loc>'
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
          sitemap.puts '  <loc>http://bitcoin.org/en/release/'+file.gsub('.md','').gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Add posts
        site.posts.each do |post|
          sitemap.puts '<url>'
          sitemap.puts '  <loc>http://bitcoin.org'+post.url.gsub('.html','')+'</loc>'
          sitemap.puts '</url>'
        end
        #Close sitemap
        sitemap.puts '</urlset>'
      end
      site.static_files << SitemapFile.new(site, site.source, '', 'sitemap.xml')

    end
  end

end
