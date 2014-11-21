# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#redirects.rb generates all redirection pages
#from _config.yml .

require 'yaml'
require 'cgi'

module Jekyll

  class PageRedirect < Page
    def initialize(site, base, srcdir, src, dst)
      @site = site
      @base = base
      @dir = srcdir
      @name = src
      self.process(src)
      self.read_yaml(File.join(base, '/'), 'index.html')
      self.data['lang'] = 'en'
      self.data['redirect'] = dst
      self.data['layout'] = 'redirect'
    end
  end

  class RedirectPageGenerator < Generator
    def generate(site)

      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('redirects').nil?
        print 'Redirects disabled' + "\n"
        return
      end

      #Load redirections
      redirects = YAML.load_file("_config.yml")['redirects']
      #Generate each redirection page
      if !File.directory?(site.dest)
        Dir.mkdir(site.dest)
      end
      redirects.each do |src,dst|
        srcar = src.split('/')
        src = srcar.pop + '.html'
        srcdir = srcar.join('/')
        site.pages << PageRedirect.new(site, site.source, srcdir, src, dst)
      end
    end
  end

end
