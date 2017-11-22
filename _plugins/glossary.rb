# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

require 'yaml'
require 'json'

module Jekyll

  class GlossaryPage < Page

    def initialize(site, base, lang, srcdir, src, output_directory)
      @site = site
      @base = base
      @dir = '/' + output_directory

      ## Output file is the source file base name plus .md for Markdown
      ## (converted later to HTML)
      output_file = src.split('.')[0] + ".md"

      ## Read in the file's YAML header
      self.read_yaml(File.join(base, srcdir), src)

      ## Pass in the full path to enable edit-on-github links
      self.data["filename"] = srcdir + '/' + src

      ## Page Title: <title> - Bitcoin Glossary
      self.data["title"] = self.data["required"]["title_max_40_characters_no_formatting"] + " - Bitcoin Glossary"

      ## Output file is v<version>.md (converted later to HTML)
      @name = output_file
      self.process(output_file)

      ## Output full path
      output_full_path = dir + "/" + output_file.gsub('.md', '')

      self.data['layout'] = 'glossary_entry'
      self.data['category'] = 'glossary_entry'
      self.data['lang'] = lang

      self.data['pagetitle-translated'] = self.data["required"]["title_max_40_characters_no_formatting"]

      ## Combine required (displayed) and optional (non-displayed)
      ## synonyms into an array
      if self.data["optional"]["synonyms_and_pluralizations_not_shown_in_glossary"].nil?
        mixed_case_terms = self.data["required"]["synonyms_shown_in_glossary_capitalize_first_letter"]
      else
        mixed_case_terms = self.data["required"]["synonyms_shown_in_glossary_capitalize_first_letter"] +\
        self.data["optional"]["synonyms_and_pluralizations_not_shown_in_glossary"]
      end

      ## Downcase all terms so we can easily detect when we create
      ## duplicated autocrossreference links
      terms = Array.new
      mixed_case_terms.each { |term|
        terms.push(term.downcase)
      }

      ## Add all synonyms to the autocrossref hash table for automatic linking
      site.config["crossref"] = site.config["crossref"] ? site.config["crossref"] : {}
      for term in terms do
        site.config["crossref"].merge!({ term => output_full_path }) {
            |key, old_value, new_value|

            if old_value != new_value
              abort("Error: autocrossref key '#{key}' wants to point to both '#{old_value}' and '#{new_value}'")
            end

            new_value
        }
      end

      ## Create a newline-containing Markdown-formatted string that
      ## includes links for all of our autocrossref-created synonyms.
      ## TODO: this should probably be done as an `include`-able
      ## template for proper division between the logic and
      ## presentation layers
      site.config["glossary_links"] = site.config["glossary_links"] ? site.config["glossary_links"] : ''
      site.config["glossary_links"] \
        += "[" \
        + output_full_path \
        + "]: " \
        + output_full_path \
        + ' "' \
        + self.data["required"]["summary_max_255_characters_no_formatting"].chomp() \
        + '"' \
        + "\n"

      ## Add only shown synonyms to the glossary hash-tables-inside-sorted-array
      ## for use in the search box and on the master listing page
      site.config["devsearches"]["Glossary"] =
          site.config["devsearches"]["Glossary"] ? site.config["devsearches"]["Glossary"] : {}
      site.config["devsearches"]["Glossary"][lang] =
          site.config["devsearches"]["Glossary"][lang] ? site.config["devsearches"]["Glossary"][lang] : []
      for term in self.data["required"]["synonyms_shown_in_glossary_capitalize_first_letter"] do
        site.config["devsearches"]["Glossary"][lang].unshift({ term => output_full_path })
      end

      ## Sort the shown synonyms array alphabetically (case
      ## insensitive). We have to do this here because the version of
      ## Jekyll/Liquid we use does not provide the ability to sort
      ## arrays when the template is compiled. Higher version of Jekyll
      ## do support this feature, so if we upgrade to Jekyll 2.2 or
      ## higher, look at doing this at template time to save CPU cycles
      ## and increase flexibility
      site.config["devsearches"]["Glossary"][lang].sort_by!{|hash|
          hash.to_s.downcase.gsub(/"=>.*/,'')
      }

    end
  end

  class GlossaryPageGenerator < Generator
    def generate(site)

      #Do nothing if plugin is disabled
      if !ENV['ENABLED_PLUGINS'].nil? and ENV['ENABLED_PLUGINS'].index('glossary').nil?
        print 'Glossary disabled' + "\n"
        return
      end

      main_dir='_data/glossary/'

      Dir.foreach(main_dir) do |dir|
        next if dir == '.' or dir == '..'
        lang=dir
        glossary_dir=main_dir+lang

        #Generate each definition page based on templates
        Dir.foreach(glossary_dir) do |file|
          next if file == '.' or file == '..'
          src = file
          output_directory = lang + '/glossary/'
          site.pages << GlossaryPage.new(site, site.source, lang, glossary_dir, src, output_directory)
        end

        devsearches_json = []
        site.config["devsearches"].each {| cat, items |
            devsearches_data_item = {}

            if cat == "Glossary"
                items.each {| lang, list |

                    list.each {| el |
                        flat = el.flatten
                        devsearches_json.push({
                            "label" => flat[0],
                            "uri" => flat[1],
                            "category" => cat,
                            "lang" => lang
                        })
                    }
                    # puts list
                }
            else
                items.each {| el |
                    flat = el.flatten
                    devsearches_json.push({
                        "label" => flat[0],
                        "uri" => flat[1],
                        "category" => cat,
                        "lang" => "en"
                    })
                }
            end
            # devsearches_json.unshift({ term => output_full_path })
            # puts items
        }

        site.config["devsearches_json"] = devsearches_json.to_json

        # #TODO definition pages are only generated for English language,
        # #but they could also be translated at some point. They would however
        # #need to fallback to English when no translation is available.
      end
    end
  end

end
