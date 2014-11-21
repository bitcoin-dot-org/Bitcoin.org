# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

#htmlescape espaces special html characters. This is a replacement for
#CGI::escapeHTML, which has an inconsistent behavior with single quotes
#on different ruby versions ( 1.9 and 2.0 ).

#Example:
# {{ page.title | htmlescape }}

module Entities

  def htmlescape(input)
    input.gsub(/['&\"<>]/, { "'" => '&apos;', '&' => '&amp;', '"' => '&quot;', '<' => '&lt;', '>' => '&gt;' })
  end

  Liquid::Template.register_filter self

end
