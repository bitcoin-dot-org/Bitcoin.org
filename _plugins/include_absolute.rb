module Jekyll
    class IncludeTagError < StandardError
        attr_accessor :path

        def initialize(msg, path)
            super(msg)
            @path = path
        end
    end

    class IncludeAbsoluteTag < Liquid::Tag
        VARIABLE_SYNTAX = %r!
        (?<variable>[^{]*(\{\{\s*[\w\-\.]+\s*(\|.*)?\}\}[^\s{}]*)+)
        (?<params>.*)
        !x

        def initialize(tag_name, markup, tokens)
            super

            path = markup.strip.split(' ')

            @file = path[0].strip

            if !path[1].nil?
                @file_fallback = path[1].strip
            end
        end

        # Render the variable if required (@see https://goo.gl/N5sMV3)
        def render_variable(context)
            if @file.match(VARIABLE_SYNTAX)
                partial = context.registers[:site]
                    .liquid_renderer
                    .file("(variable)")
                    .parse(@file)
                partial.render!(context)
            end
        end

        def render(context)
            file          = render_variable(context) || @file
            source        = File.expand_path(context.registers[:site].config['source']).freeze
            path          = File.join(source, file)

            begin
                partial = Liquid::Template.parse(read_file(path, context))

                context.stack do
                    context['include'] = parse_params(context) if @params
                    partial.render!(context)
                end
            rescue => e
                if !@file_fallback.nil?
                    begin
                        path_fallback = File.join(source, @file_fallback)

                        partial = Liquid::Template.parse(read_file(path_fallback, context))

                        context.stack do
                            context['include'] = parse_params(context) if @params
                            partial.render!(context)
                        end
                    rescue => e
                        raise IncludeTagError.new e.message, path_fallback
                    end
                else
                    raise IncludeTagError.new e.message, path
                end
            end
        end

        def read_file(file, context)
            File.read(file, file_read_opts(context))
        end

        def file_read_opts(context)
            context.registers[:site].file_read_opts
        end
    end
end

Liquid::Template.register_tag('include_absolute', Jekyll::IncludeAbsoluteTag)
