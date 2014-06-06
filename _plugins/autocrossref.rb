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

      ## Workaround for inconsistent relative directory
      path = File.expand_path(File.dirname(__FILE__)) + "/.."
      ## Load terms from file
      site = context.registers[:site].config
      if !site.has_key?("crossref")
        site['crossref'] = YAML.load_file(path + "/_autocrossref.yaml")
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
            (?![\S ]*<\/span>)      ## No subst on a line with a close span. This 
                                    ## prevents matching in highlight blocks
            (?![^\(]*(\.svg|\.png))  ## No subst if key inside an image name. This 
		     ## simple regex has the side effect that we can't
		     ## use .svg or .png in non-image base text; if that
		     ## becomes an issue, we can devise a more complex
		     ## regex
            (?!\w)  ## Don't match inside words
          /xmi, "[\\&][#{term[1]}]{:.auto-link}")
      }
      output.gsub!(/<!--.*?-->/m,'')  ## Remove all HTML comments

      output
    end
  end
end

Liquid::Template.register_tag('autocrossref', Jekyll::AutoCrossRefBlock)
