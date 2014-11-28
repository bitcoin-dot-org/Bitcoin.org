# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#svg.rb is a workaround to allow built-in jekyll server
#to serve svg files with jekyll --server.

require 'webrick'
include WEBrick

WEBrick::HTTPUtils::DefaultMimeTypes.store 'svg', 'image/svg+xml'
