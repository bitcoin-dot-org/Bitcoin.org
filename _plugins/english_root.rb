# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

# english_root.rb serves English pages at the site root.
#
# Pages that used to be published under /en/ are published at the root
# instead, and a redirect page is left at each old /en/ address so that
# existing links keep working. The server should also answer those old
# addresses with a permanent (301) redirect; the redirect pages are the
# fallback.
#
# Feeds under /en/rss/ keep their address, so existing subscriptions
# keep working.

module EnglishRoot

  OLD_PREFIX = '/en'
  KEEP_UNDER_OLD_PREFIX = %r{\Aen/rss/}

  # Public form of a URL, the way the site links to it.
  def self.public_path(url)
    url.sub(%r{/index\.html\z}, '/').sub(/\.html\z/, '')
  end

  # File a URL is written to, the way Jekyll names it: /foo/ and
  # /foo/index.html are the same file, and so are /foo and /foo.html.
  def self.file_of(url)
    path = url.to_s.sub(%r{\A/}, '')
    return path + 'index.html' if path.empty? || path.end_with?('/')
    File.extname(path).empty? ? path + '.html' : path
  end

end

# Static pages kept in the en/ source directory.
Jekyll::Hooks.register :pages, :post_init do |page|
  path = page.relative_path.to_s
  next unless path.start_with?('en/')
  next if path.match?(EnglishRoot::KEEP_UNDER_OLD_PREFIX)
  old_url = page.url
  page.data['permalink'] = old_url.sub(%r{\A#{EnglishRoot::OLD_PREFIX}/}, '/')
  page.instance_variable_set(:@url, nil)
  page.data['english_root'] = true
end

module Jekyll

  class EnglishRootRedirectGenerator < Generator
    # After the page generators, before the sitemap and hreflang
    # generators (both :lowest), which skip redirect pages.
    priority :low

    def generate(site)
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('redirects').nil?
        return
      end

      configured = site.config.fetch('redirects', {}).keys
      taken = (site.pages.map(&:url) + configured).to_h { |url| [EnglishRoot.file_of(url), true] }

      moved = site.pages.select { |page| page.data['english_root'] }
      moved += site.posts.docs.reject { |doc| doc.url.start_with?(EnglishRoot::OLD_PREFIX + '/') }

      # The English homepage moved from /en/ to the root index.html.
      targets = { EnglishRoot::OLD_PREFIX + '/index.html' => '/' }
      moved.each do |page|
        next unless page.url.end_with?('.html', '/')
        old_url = EnglishRoot::OLD_PREFIX + page.url
        old_url += 'index.html' if old_url.end_with?('/')
        targets[old_url] = EnglishRoot.public_path(page.url)
      end

      # Old English addresses that are themselves redirects also answer at
      # the root, so links built with the English prefix (for example the
      # language selector) keep reaching them.
      site.config.fetch('redirects', {}).each do |key, target|
        next unless key.start_with?(EnglishRoot::OLD_PREFIX + '/')
        next if key.include?('#')
        root_key = key.sub(EnglishRoot::OLD_PREFIX, '')
        next if root_key == '/'
        root_url = root_key.end_with?('/') ? root_key + 'index.html' : root_key + '.html'
        targets[root_url] ||= target
      end

      targets.each do |old_url, target|
        next if taken[EnglishRoot.file_of(old_url)]
        dir, name = File.split(old_url)
        site.pages << PageRedirect.new(site, site.source, dir, name, target)
        taken[EnglishRoot.file_of(old_url)] = true
      end
    end
  end

  # English pages now share the root with alert short URLs and redirect
  # keys. Jekyll only warns about two files writing to the same place in
  # `jekyll doctor`, so fail the build here instead.
  class UniqueOutputFileGenerator < Generator
    priority :lowest

    def generate(site)
      files = (site.pages + site.posts.docs).map { |page| EnglishRoot.file_of(page.url) }
      duplicates = files.group_by(&:itself).select { |_, list| list.size > 1 }.keys
      return if duplicates.empty?
      raise Jekyll::Errors::FatalException,
            "Several pages are written to the same file: #{duplicates.sort.join(', ')}"
    end
  end

end
