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

      less_dir = File.join(site.source, '_less')

      if File.symlink?(less_dir)
        return "LessCSS directory '#{less_dir}' cannot be a symlink"
      end

      if @file !~ /^[a-zA-Z0-9_\/\.-]+$/ || @file =~ /\.\// || @file =~ /\/\./
        return "LessCSS file '#{@file}' contains invalid characters or sequences"
      end

      Dir.chdir(less_dir) do
        choices = Dir['**/*'].reject { |x| File.symlink?(x) }
        if choices.include?(@file)
          source = File.read(@file)
          f = IO.popen("lessc -", "w+")
          f.write(source)
          f.close_write()

          css = f.readlines().join()

          digest = Digest::MD5.hexdigest(css)

          css_file = digest + ".css"
          css_path = File.join(site.dest, css_file)
          
          if !Dir.exist?(site.dest)
            Dir.mkdir(site.dest)
          end
          File.open(css_path, "w") do |f|
            f.write(css)
          end

          site.static_files << LessCSSFile.new(site, site.source, '', css_file)
        
          '<link rel="stylesheet" type="text/css" href="/' + css_file + '" />'
        else
          return "LessCSS file '#{@file}' not found in '#{less_dir}'"
        end
      end
    end
  end

end

Liquid::Template.register_tag('lesscss', Jekyll::LessCSS)
