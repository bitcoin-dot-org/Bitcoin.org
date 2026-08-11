#!/usr/bin/env ruby
# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# Validates that every tracked YAML file parses with Psych, the same
# parser the build uses. A syntax error fails fast here with the file
# name and position, instead of aborting the Jekyll build later with
# no obvious culprit. Proposed in issue 4911.

require 'yaml'

files = `git ls-files -z -- '*.yml' '*.yaml'`.split("\0")
abort 'check-yaml: no YAML files found' if files.empty?

failures = 0
files.each do |f|
  begin
    if YAML.respond_to?(:unsafe_load_file)
      YAML.unsafe_load_file(f)
    else
      YAML.load_file(f)
    end
  rescue StandardError => e
    warn "check-yaml: #{f}: #{e.message}"
    failures += 1
  end
end

if failures.zero?
  puts "check-yaml: #{files.length} YAML files parsed OK"
else
  warn "check-yaml: #{failures} invalid YAML file(s)"
  exit 1
end
