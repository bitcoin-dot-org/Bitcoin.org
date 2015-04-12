# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# remove-html-extensions is a temporary workaround to allow the built-in
# Jekyll server to serve files like /foo.html as /foo
# This functonality is already part of Jekyll 3.0.0beta and this plugin
# can be removed when we upgrade that far

require 'webrick'
include WEBrick

## Code starting here taken from https://github.com/jekyll/jekyll/commit/e99a9e5821a7ba16ce42a1f5de378012f22acae0 MIT license

# Custom WEBrick FileHandler servlet for serving "/file.html" at "/file"
# when no exact match is found. This mirrors the behavior of GitHub Pages
# and many static web server configs.
class FileHandler < ::WEBrick::HTTPServlet::FileHandler
  def search_file(req, res, basename)
    if file = super
      file
    else
      super(req, res, "#{basename}.html")
    end
  end
end

## End copied code

## Horribly hackish and produces a warning, but it works and avoids us
## having to modify Jekyll on every end-user system
WEBrick::HTTPServlet::FileHandler = FileHandler
