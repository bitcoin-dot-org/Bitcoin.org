---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.		
{% endcomment %}

layout: base
id: config-linux
---

### Configure Linux Tor Service

* [Review Linux Instructions](https://bitcoin.org/en/full-node#linux-instructions)

{% comment %}Scrape wiki content{% endcomment %}
{% assign url = 'https://en.bitcoin.it/wiki/Setting_up_a_Tor_hidden_service' %}
{% capture remote_page %}
{% include_remote {{ url }} %}
{% endcapture %}

- [bitcoin.it/wiki/Setting_up_a_Tor_hidden_service](https://en.bitcoin.it/wiki/Setting_up_a_Tor_hidden_service)

{% comment %}
We start from the end of the wiki page to avoid extreneous content
REF: https://shopify.github.io/liquid/filters/slice/
{% endcomment %}
{{ remote_page | slice: -15225, 6985 | strip_html}}
<hr>
<center>
<iframe width="100%" height="300em" src="https://www.youtube.com/embed/ak_u5d0onJs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

{% include tor/config-debian.md %}	

---

{% include tor/config-ubuntu.md %}	

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/lmMVoBgIzNc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/n2IUYL7hCOI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


{% include tor/config-alpine.md %}	

- TEXT

{% comment %}		
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

