#!/usr/bin/env ruby
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'safe_yaml/load'
require 'json-schema'

if ARGV[1].nil?
  puts "Usage: schema-validator.rb <schema-file> <file-to-validate>"
  exit(255)
end

schema_file = ARGV[0]
file_to_validate = ARGV[1]

file = File.open(schema_file, 'r')
schema = SafeYAML.load(file)
file.close()

file = File.open(file_to_validate, 'r')
document = SafeYAML.load(file)
file.close()

results = JSON::Validator.fully_validate(schema, document)

if results.empty?
  exit(0)
else
  puts ARGV[1]
  puts results
  exit(1)
end
