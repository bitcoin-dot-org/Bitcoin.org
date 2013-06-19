require 'yaml'
require 'cgi'

#This plugin generates all translated pages using templates in
#_templates. The final file name of each page is defined in 
#the url section of each translations in _translations.

#If a page is defined in _redirects.yml, this plugin will
#generate a redirection instead of using the template.

module Jekyll

  class TranslatePage < Page
    def initialize(site, base, lang, srcdir, src, dstdir, dst)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['lang'] = lang
    end
  end

  class TranslateRedirect < StaticFile
    def write(dest)
      # do nothing
    end
  end

  class TranslatePageGenerator < Generator
    def generate(site)
      #load translations files
      locs = {}
      Dir.foreach('_translations') do |file|
        next if file == '.' or file == '..'
        lang = file.split('.')[0]
        locs[lang] = YAML.load_file("_translations/"+file)[lang]
      end
      #Load redirections
      redirects = YAML.load_file('_redirects.yml')['redirects']
      #Generate each translated page based on templates
      locs.each do |lang,value|
        Dir.foreach('_templates') do |file|
          next if file == '.' or file == '..'
          id = file.split('.')[0]
          next if redirects.has_key?(id) and ( !redirects[id].has_key?('except') or !redirects[id]['except'].has_key?(lang) )
          dst = locs[lang]['url'][id]
          next if dst.nil?
          src = file
          dst = dst+'.html'
          site.pages << TranslatePage.new(site, site.source, lang, '_templates', src, lang, dst)
        end
        site.pages << TranslatePage.new(site, site.source, lang, '_templates', 'index.html', lang, 'index.html')
        #Generate each redirection page based on _redirects.yml
        redirects.each do |id,redirect|
          next if redirect.has_key?('except') and redirect['except'].has_key?(lang)
          src = locs[lang]['url'][id]
          next if src.nil?
          src = src+'.html'
          dst = redirect['dst']
          dst = locs[lang]['url'][dst]
          next if dst.nil?
          File.open(site.dest + '/' + lang + '/' + src, 'w+') do |file|
            file.puts '<!DOCTYPE HTML>'
            file.puts '<html><head>'
            file.puts '<meta name="robots" content="noindex">'
            file.puts '<script>window.location.href=\'/'+lang+'/'+CGI::escape(dst)+'\';</script>'
            file.puts '</head></html>'
          end
          site.static_files << TranslateRedirect.new(site, site.source, '', lang+'/'+src)
        end
      end
    end
  end

end
