source 'https://rubygems.org'

## If you update the version here, also update it in .travis.yml and
## README.md. Then push your branch and make sure Travis supports that
## version. Then remind one of the site maintainers that they need to
## run `rvm install <VERSION>` on the build server(s) before they commit
## to master
ruby '2.0.0'

## Used on the build server. If you add a package here (like nokogiri)
## that has non-Gem dependencies (like zlib), please remind the site
## maintainers that they need to manually update the build server(s)
## before they commit to master. If `bundle install` can satisfy all
## your dependencies, then nothing extra needs to be done
group :development do
  gem 'ffi-icu'
  ## When we upgrade to Jekyll 3.0.0 or higher, remove
  ## _plugin/remove-html-extension.rb
  gem 'jekyll', '~>3.0'
  gem 'json'
  gem 'less', '2.4.0'
  gem 'kramdown'
  gem 'RedCloth'
  gem 'therubyracer' # required by less
  gem 'jshintrb', '~>0.3.0'
  gem 'safe_yaml'
  gem 'json-schema'
end

## Not used on build server. Only used by developers and Travis CI, so
## you can put whatever you want here and bundler will tell us humans to
## install the new Gems.
group :slow_test do
  gem 'html-proofer', '2.1.0'
end
