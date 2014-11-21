# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'digest/md5'

module Jekyll

  class LessCSSFile < StaticFile
    def write(dest)
      # do nothing
    end
  end

  class LessCSS < Liquid::Tag
    def initialize(tag_name, file, tokens)
      super
      @file = file.strip
    end

    def render(context)
      site = context.registers[:site]
      config = context.registers[:site].config
      if !config.has_key?('lessdone')
        config['lessdone'] = {}
      end
      less_dir = File.join(site.source, '_less')
      if File.symlink?(less_dir)
        return "LessCSS directory '#{less_dir}' cannot be a symlink"
      end
      #Process file only if it hasn't been processed yet
      if !config['lessdone'].has_key?(@file)
        Dir.chdir(less_dir) do
          choices = Dir['**/*'].reject { |x| File.symlink?(x) }
          if choices.include?(@file)
            #Generate file content with less, those that end with .css
            if /\.css$/.match(@file)
              f = file = File.new(@file, "r")
            else
              source = File.read(@file)
              f = IO.popen("lessc -x -", "w+")
              f.write(source)
              f.close_write()
            end
            #Keep MD5 hash of the file as the file name
            css = f.readlines().join()
            digest = Digest::MD5.hexdigest(css)
            css_file = digest + ".css"
            css_path = File.join(site.dest, css_file)
            #Write final file
            if !File.directory?(site.dest)
              Dir.mkdir(site.dest)
            end
            File.open(css_path, "w") do |f|
              f.write(css)
            end
            site.static_files << LessCSSFile.new(site, site.source, '', css_file)
            #Save the filename so the file isn't processed again
            config['lessdone'][@file] = css_file
          else
            return "LessCSS file '#{@file}' not found in '#{less_dir}'"
          end
        end
      end
      #Print CSS link in HTML layout
      '<link rel="stylesheet" type="text/css" href="/' + config['lessdone'][@file] + '" />'
    end
  end

end

Liquid::Template.register_tag('lesscss', Jekyll::LessCSS)
