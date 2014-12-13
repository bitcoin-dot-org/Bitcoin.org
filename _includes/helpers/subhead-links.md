{% if filename %}<div class="subhead-links"
><a href="https://github.com/bitcoin/bitcoin.org/edit/master/{{filename|uri_escape}}">Edit</a>
| <a href="https://github.com/bitcoin/bitcoin.org/commits/master/{{filename|uri_escape}}">History</a>
| <a href="https://github.com/bitcoin/bitcoin.org/issues/new?body=Source%20File%3A%20{{filename|uri_escape}}%0A%0A">Report Issue</a>
| <a href="/en/development#devcommunities">Discuss</a></div>
{% else %}
{% die %}
{% endif %}
