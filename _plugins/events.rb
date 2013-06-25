require 'yaml'

module Jekyll

  class EventPage < Page
    def initialize(site, base, srcdir, src, dstdir, dst, date)
      @site = site
      @base = base
      @dir = '/'+dstdir
      @name = dst
      self.process(dst)
      self.read_yaml(File.join(base, srcdir), src)
      self.data['date'] = date
      self.data['category'] = 'event'
    end
  end

  class EventPageGenerator < Generator
    def generate(site)
      #generate each event page
      Dir.foreach('_events') do |file|
        next if file == '.' or file == '..'
        date = file.split('-')
        next if date.length < 4
        date = date[0] + '-' + date[1] + '-' + date[2]
        next if !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.match(date)
        site.pages << EventPage.new(site, site.source, '_events', file, 'event', file, date)
      end
    end
  end

end
