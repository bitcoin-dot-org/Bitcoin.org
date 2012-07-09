class Random < Liquid::Tag
  Syntax = /(\w+[.]?\w+)\s+(\w+)/o

  def initialize(tag_name, markup, tokens)
    if markup =~ Syntax
      @collection_name = $1
      @randomized_name = $2
    else
      raise SyntaxError.new("Syntax Error in 'random' - Valid syntax: random [source] [var]")
    end
    super
  end

  def render(context)
    collection = context[@collection_name]
    collection = collection.sort_by{rand}
    context[@randomized_name] = collection
    return
  end
end

Liquid::Template.register_tag('random', Random)

