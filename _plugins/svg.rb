#svg.rb is a workaround to allow built-in jekyll server
#to serve svg files with jekyll --server.

require 'webrick'
include WEBrick

WEBrick::HTTPUtils::DefaultMimeTypes.store 'svg', 'image/svg+xml'
