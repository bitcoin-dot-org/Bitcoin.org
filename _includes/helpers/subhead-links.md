{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}{% if filename %}<div class="subhead-links sourcefile" data-sourcefile="{{filename|uri_escape}}"
><a href="https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/{{filename|uri_escape}}">Edit</a>
| <a href="https://github.com/bitcoin-dot-org/bitcoin.org/commits/master/{{filename|uri_escape}}">History</a>
| <a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?body=Source%20File%3A%20{{filename|uri_escape}}%0A%0A">Report Issue</a>
| <a href="/en/development#devcommunities">Discuss</a></div>
{% else %}
{% die "source filename not set" %}
{% endif %}
