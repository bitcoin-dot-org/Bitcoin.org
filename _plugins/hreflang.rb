# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

module Jekyll
  class HreflangGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      origin = site.config.fetch('url', 'https://bitcoin.org')
                          .sub(%r{/$}, '')

      language_order = Array(site.config['langsorder'])
      groups = Hash.new { |hash, id| hash[id] = [] }

      canonical_pages(site).each do |page|
        next unless canonicalizable?(page)

        page.data['canonical_url'] = canonical_url(page, origin)
      end

      site.pages.each do |page|
        id = page.data['id']
        lang = page.data['lang']

        next if id.nil? || lang.nil?

        # Redirect pages inherit id: index from index.html, but they are
        # not translated versions of the language homepage.
        next if page.data['redirect']

        path = public_path(page.url)

        # Only /<language>/ belongs to the homepage translation group.
        # This also excludes /404.html and any other page that
        # unintentionally inherits id: index.
        next if id == 'index' && path != "/#{lang}/"

        # Exclude non-localized pages such as the root homepage.
        next unless path.start_with?("/#{lang}/")

        groups[id] << [page, lang, path]
      end

      groups.each do |id, entries|
        by_language = {}

        entries.each do |entry|
          lang = entry[1]
          existing = by_language[lang]

          unless existing.nil?
            raise Jekyll::Errors::FatalException,
                  "Duplicate hreflang pages for id #{id.inspect} and " \
                  "language #{lang.inspect}: #{existing[2]} and #{entry[2]}"
          end

          by_language[lang] = entry
        end

        # A page with only one language has no translated alternatives.
        next if by_language.length < 2

        alternates = by_language.values
                                .sort_by do |_page, lang, _path|
          language_order.index(lang) || language_order.length
        end
                                .map do |_page, lang, path|
          {
            'lang' => lang.tr('_', '-'),
            'url'  => origin + path
          }
        end

        entries.each do |page, _lang, _path|
          page.data['hreflang_alternates'] = alternates

          # The root URL selects or redirects to the appropriate
          # language and is therefore the homepage x-default.
          if id == 'index'
            page.data['hreflang_x_default'] = origin + '/'
          end
        end
      end
    end

    private

    def canonical_pages(site)
      documents = site.collections.values
                      .select(&:write?)
                      .flat_map(&:docs)

      (site.pages + documents).uniq
    end

    def canonicalizable?(page)
      # Redirect stubs and error pages must not declare themselves as
      # canonical content.
      return false if page.data['redirect']
      return false unless page.output_ext == '.html'
      return false if page.url.to_s == '/404.html'
      # Google verification files are HTML-shaped but are not site pages.
      return false if page.content.to_s.include?('google-site-verification:')

      true
    end

    def canonical_url(page, origin)
      explicit = page.data['canonical']
      candidate = explicit.nil? ? page.url : explicit

      return candidate if candidate.to_s.match?(%r{\Ahttps?://})

      origin + public_path(candidate)
    end

    def public_path(url)
      path = url.to_s
      path = "/#{path}" unless path.start_with?('/')

      path.sub(%r{/index\.html$}, '/')
          .sub(/\.html$/, '')
    end
  end
end
