## Blog Posts

Posts for the [Bitcoin.org Site Blog](https://bitcoin.org/en/blog) should be 
added to the `_posts` directory with the naming convention:
`YEAR-MONTH-DAY-ARBITRARY_FILE_NAME` (with year, month, and day as
two-digit numbers).  The YAML front matter should be similar to this:

    ---
    type: posts
    layout: post
    lang: en
    category: blog

    title: "Quarterly Report March 2015"
    permalink: /en/posts/quarterly-report-march-2015.html
    date: 2015-03-05
    author: >
      David A. Harding (<a href="mailto:dave@dtrt.org">email</a>, <a
      href="https://github.com/harding">GitHub</a>,
      <a href="http://www.reddit.com/user/harda/">Reddit</a>)
    ---

The type, layout, and category should always be as specified above. The
other parameters should be set to values specific to that post, but the
permalink must end in '.html'.

Below the YAML front matter, enter the content of the post in Markdown
format.  Images should be placed in `img/blog/free` if they are
MIT-licensed or `img/blog/nonfree` if they have a more restrictive
copyright license.
