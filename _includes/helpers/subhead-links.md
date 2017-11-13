{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}{% if filename %}<div class="subhead-links sourcefile" data-sourcefile="{{filename|uri_escape}}"
><a href="https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/{{filename|uri_escape}}">{% translate subheadlinkedit developer-documentation %}</a>
| <a href="https://github.com/bitcoin-dot-org/bitcoin.org/commits/master/{{filename|uri_escape}}">{% translate subheadlinkhistory developer-documentation %}</a>
| <a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?body=Source%20File%3A%20{{filename|uri_escape}}%0A%0A">{% translate subheadlinkreport developer-documentation %}</a>
| <a href="/{{ page.lang }}/development#devcommunities">{% translate subheadlinkdiscuss developer-documentation %}</a></div>
{% else %}
{% die "source filename not set" %}
{% endif %}
