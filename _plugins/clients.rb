module Jekyll

  class Clients < Liquid::Tag
    def render(context)
      page = context.environments.first['page']
      r = ''
      for h in page['client_info']
        r += '<tr>'
        r += '<th>' + h['text'] + '</th>'
        hid = h['id']
        td = h.fetch('td', 'td')
        for c in page['clients']
          if c.has_key?('incomplete')
            next
          end
          ci = c[hid]
          curi = c.fetch(hid + '_uri', nil)
          r += '<' + td + ' class="clients ' + c['os']
          if h.has_key?(ci)
            r += ' ' + h[ci]
          end
          r += '">'
          if curi
            r += "<a href='" + curi + "'>" + ci + "</a>"
          elsif ci
            r += ci
          end
          r += "</" + td + ">"
        end
        r += '</tr>'
      end
      r
    end
  end

end

Liquid::Template.register_tag('clients', Jekyll::Clients)
