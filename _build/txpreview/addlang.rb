#!/usr/bin/env ruby

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

PATH = Dir.pwd

if ARGV.empty?
  return
else
  la = ARGV[0]
end

contents = File.read(PATH + '/_config.yml')

if Regexp.new('langsorder:.*?' + "\n" + '- \'' + la + '\'' + "\n", Regexp::MULTILINE).match(contents).nil?
	contents.gsub!(Regexp.new("(langsorder:.*?)\n\n", Regexp::MULTILINE),'\1' + "\n" + '- \'' + la + '\'' + "\n\n")
	contents.gsub!(Regexp.new("(langs:.*?)\n\n", Regexp::MULTILINE),'\1' + "\n" + '  \'' + la + '\': \'' + la + '\'' + "\n\n")
end

File.open(PATH + '/_config.yml', 'w') do |file|
   file.write(contents)
end
