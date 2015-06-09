# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## autocrossref.rb automatically adds cross reference links in documentation
## texts using the list of words defined in _autocrossref.yaml.

## Example:
## {% autocrossref %}
## ...content...
## {% endautocrossref %}

## If you have a patten you usually want to match (such as "satoshi"
## (currency)) but which may appear a few times where you don't want it
## to match (such as "Satoshi" (name)), append a <!--noref--> HTML comment.
## E.g.: Bitcoin was invented by Satoshi<!--noref--> Nakamoto.

## An alternative match-prevention method, useful for strings inside ``
## (code) is to make it look to the parser like the string is inside of
## a do-not-parse [bracket] expression. E.g. [paymentrequest][] would
## otherwise match this:
## <!--[-->`src/qt/paymentrequest.proto`<!--]-->

module Jekyll

require 'yaml'

  class AutoCrossRefBlock < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      output = super

      ## Load terms from file only if we haven't loaded them before
      site = context.registers[:site].config
      if !site.has_key?("crossref_loaded")

        ## Load refs from file and then downcase them all so we can
        ## easily detect when we define xrefs more than once
        mixed_case_refs = YAML.load_file("_autocrossref.yaml")
        unvalidated_refs = Hash.new
        mixed_case_refs.each { |key, value|
          unvalidated_refs[key.to_s.downcase] = value.to_s.downcase
        }

        if site.has_key?("crossref")
          ## We already have refs loaded, so merge
          site['crossref'].merge!(unvalidated_refs) {
            |key, old_value, new_value|

            if old_value != new_value
              abort("Error: autocrossref key '#{key}' wants to point to both '#{old_value}' and '#{new_value}'")
            end

            new_value
          }
        else
          ## We don't have refs loaded yet, so copy
          site['crossref'] = unvalidated_refs
        end
        site['crossref_loaded'] = true
      end


      ## Sort terms by reverse length, so longest matches get linked
      ## first (e.g. "block chain" before "block"). Otherwise short
      ## terms would get linked first and there'd be nothing for long
      ## terms to link to.
      site['crossref'].sort_by { |k, v| -k.length }.each { |term|

        term[1] = term[0] if term[1].nil? || term[1].empty?

        term[0] = Regexp.escape(term[0])

        ## Replace literal space with \s to match across newlines. This
        ## can do weird things if you don't end sentences with a period,
        ## such as linking together "standard" and "transactions" in
        ## something like this:
        ### * RFC1234 is a standard
        ###
        ### Transactions are cool
        term[0].gsub!('\ ', '\s+')

        output.gsub!(/
            (?<!\w)  ## Don't match inside words
            #{term[0]}('s)?  ## Find our key
            (?![^\[]*\])  ## No subst if key inside [brackets]
            (?![^\{]*\})  ## No subst if key inside {braces}
            (?![^\s]*<!--noref-->)  ## No subst if <!--noref--> after key
            (?!((?!<pre>).)*(<\/pre>))  ## No subst on a line with a closing pre tag. This 
                                        ## prevents matching in {% highlight %} code blocks.
            (?![^\(]*(\.svg|\.png|\.gif))  ## No subst if key inside an image name. This 
		     ## simple regex has the side effect that we can't
		     ## use .svg, .png, or .gif in non-image base text; if that
		     ## becomes an issue, we can devise a more complex
		     ## regex
            (?!\w)  ## Don't match inside words
            (?!`)   ## Don't match strings ending with a tic, unless the xref itself ends with a tic
          /xmi) {|s|
              if term[1] == "do not autocrossref"
                  s.gsub(/( |$)/, "<!--noref-->\\&")
              else
                  "[#{s}][#{term[1]}]{:.auto-link}"
              end
              }
      }
      output.gsub!(/<!--.*?-->/m,'')  ## Remove all HTML comments

      output
    end
  end
end

module Jekyll

require 'yaml'

  class AutoCrossRefBlockDisabled < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      output = super

      output
    end
  end
end



#Do nothing if plugin is disabled
if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('autocrossref').nil?
  print 'Autocrossref disabled' + "\n"
  Liquid::Template.register_tag('autocrossref', Jekyll::AutoCrossRefBlockDisabled)
else
  Liquid::Template.register_tag('autocrossref', Jekyll::AutoCrossRefBlock)
end
