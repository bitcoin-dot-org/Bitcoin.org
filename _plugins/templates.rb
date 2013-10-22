#templates.rb generates all translated pages using templates in
#_templates. The final file name of each page is defined in 
#the url section of each translations in _translations.

#If a page is defined in _redirects, this plugin will
#generate a redirection instead of using the template.

require 'yaml'
require 'cgi'

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

  class PageRedirect < Page
    def initialize(site, base, lang, srcdir, src, dstdir, dst, red)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['lang'] = lang
      self.data['redirect'] = red
      self.data['layout'] = 'redirect'
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
      #Load redirections files
      redirects = {}
      Dir.foreach('_redirects') do |file|
        next if file == '.' or file == '..'
        id = file.split('.')[0]
        redirects[id] = YAML.load_file("_redirects/" + file)
      end
      #Generate each translated page based on templates
      locs.each do |lang,value|
        Dir.foreach('_templates') do |file|
          next if file == '.' or file == '..'
          id = file.split('.')[0]
          next if redirects.has_key?(id) and ( !redirects[id].has_key?('except') or !redirects[id]['except'].has_key?(lang) )
          dst = locs[lang]['url'][id]
          next if dst.nil? or dst == ''
          src = file
          dst = dst+'.html'
          site.pages << TranslatePage.new(site, site.source, lang, '_templates', src, lang, dst)
        end
        site.pages << TranslatePage.new(site, site.source, lang, '_templates', 'index.html', lang, 'index.html')
        #Generate each redirection page based on _redirects.yml
        if !File.directory?(site.dest)
          Dir.mkdir(site.dest)
        end
        redirects.each do |id,redirect|
          next if redirect.has_key?('except') and redirect['except'].has_key?(lang)
          src = redirect['dst']
          src = src + '.html'
          dst = locs[lang]['url'][id]
          next if dst.nil? or dst == ''
          dst = dst + '.html'
          red = redirect['dst']
          red = locs[lang]['url'][red]
          next if red.nil? or red == ''
          red = '/' + lang + '/' + CGI::escape(red)
          site.pages << PageRedirect.new(site, site.source, lang, '_templates', src, lang, dst, red)
        end
      end
    end
  end

end
