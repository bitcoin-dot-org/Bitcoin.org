#!/usr/bin/env ruby

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#Drop outdated fallback HTML code in all layouts for specified language.
#Example: ./_contrib/updatetx.rb

def prompt(*args)
    print(*args)
    gets
end

if ARGV.empty?
  lang = prompt "Language code: "
else
  lang = ARGV[0]
end

lang = lang.gsub(/[^a-zA-Z_]/,'')

if !File.exist?('_translations/' + lang + '.yml')
  print "Wrong language code. \n"
  exit
end

dirs = [ '_templates', '_layouts' ]

dirs.each do |dir|
  Dir.foreach(dir) do |file|
    next if file == '.' or file == '..'
    contents = File.read(dir + '/' + file)
    # Drop HTML code applied to current language only ( until next {% when / else / endcase %} statement )
    contents.gsub!(Regexp.new("{% when '" + lang + "' %}((?!{% endcase %})(?!{% else %}).)*?{% when", Regexp::MULTILINE),'{% when')
    contents.gsub!(Regexp.new("{% when '" + lang + "' %}((?!{% endcase %}).)*?{% else %}", Regexp::MULTILINE),'{% else %}')
    contents.gsub!(Regexp.new("{% when '" + lang + "' %}.*?{% endcase %}", Regexp::MULTILINE),'{% endcase %}')
    # Drop complete {% case / endcase %} statements when not used by any language anymore
    contents.gsub!(Regexp.new("{% case page.lang %}(((?!{% endcase %})(?!{% when ).)*?){% else %}(.*?){% endcase %}", Regexp::MULTILINE),'\1 \3')
    contents.gsub!(Regexp.new("{% case page.lang %}(((?!{% when ).)*?){% endcase %}", Regexp::MULTILINE),'\1')
    # Drop language in statements applied to many languages ( e.g. {% when 'ar' or 'fr' .. %} )
    contents.gsub!(Regexp.new("{% when '" + lang + "' or (.*?) %}"),'{% when \1 %}')
    contents.gsub!(Regexp.new("{% when (.*?) or '" + lang + "' (.*?)%}"),'{% when \1 \2%}')
    File.open(dir + '/' + file, 'w') do |file|
      file.write(contents)
    end
  end
end
