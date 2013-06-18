module Jekyll

  class TranslatePage < Page
    def initialize(site, base, lang, src, dst)
      @site = site
      @base = base
      @dir = lang
      @name = dst

      self.process(dst)
      self.read_yaml(File.join(base, '_templates'), src)
      self.data['lang'] = lang
    end
  end

  class TranslatePageGenerator < Generator
    def generate(site)
      #load translations files
      locs = {}
      Dir.foreach('_translations') do |file|
        next if file == '.' or file == '..'
        lang=file.split('.')[0]
        locs[lang] = YAML.load_file("_translations/"+file)[lang]
      end
      #generate each translated page based on templates
      locs.each do |lang,value|
        Dir.foreach('_templates') do |src|
          next if src == '.' or src == '..'
          id=src.split('.')[0]
          dst=locs[lang]['url'][id]
          next if dst.nil?
          dst=dst+'.html'
          site.pages << TranslatePage.new(site, site.source, lang, src, dst)
        end
        site.pages << TranslatePage.new(site, site.source, lang, 'index.html', 'index.html')
      end
    end
  end

end
