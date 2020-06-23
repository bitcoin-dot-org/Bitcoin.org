#!/usr/bin/env ruby
# frozen_string_literal: false

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

PATH = Dir.pwd

ARGV.empty? && return

la = ARGV[0]

contents = File.read(PATH + '/_config.yml')

# rubocop:disable Layout/LineLength
if Regexp.new('langsorder:.*?' + "\n" + '- \'' + la + '\'' + "\n", Regexp::MULTILINE).match(contents).nil?
  contents.gsub!(Regexp.new("(langsorder:.*?)\n\n", Regexp::MULTILINE), '\1' + "\n" + '- \'' + la + '\'' + "\n\n")
  contents.gsub!(Regexp.new("(langs:.*?)\n\n", Regexp::MULTILINE), '\1' + "\n" + '  \'' + la + '\': \'' + la + '\'' + "\n\n")
end
# rubocop:enable Layout/LineLength

File.open(PATH + '/_config.yml', 'w') do |file|
  file.write(contents)
end
