{% comment %}	
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.		
{% endcomment %}	

### Why run a Bitcoin Tor Hidden Service? [^Dislaimer]

[^Dislaimer]:	{% translate dislaimer %} This information is provided for educational purposes ONLY!

[^Legal]:	[https://bitcoin.org/{{ page.lang }}/legal](https://bitcoin.org/{{ page.lang }}/legal)

---

<center>
<iframe width="100%" height="300em" src="https://www.youtube.com/embed/6czcc1gZ7Ak" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

* **Privacy:** It increases the privacy of other Bitcoin users who are anonymizing their actions via Tor. Specifically, it is a countermeasure to many of the “network observer” attacks listed on the Open Bitcoin Privacy Project’s threat model.

* **More Robust:** It makes your own node more robust against Sybil attacks and network partitions.

* **Legal:** Bitcoin is [prohibited or restricted in some
  areas.](https://en.wikipedia.org/wiki/Legality_of_bitcoin_by_country) [^Legal]

* **Statistics:** As of 22 DEC 2020 - 22.74% of reachable nodes are running a Tor hidden service. [Bitnodes.21.co](https://bitnodes.io/nodes/?q=Tor%20network)

* **Attack target:** Bitcoin Core powers the Bitcoin peer-to-peer network, so people who want to disrupt the network may attack Bitcoin Core users in ways that will affect other things you do with your computer, such as an attack that limits your available download bandwidth.

#### [Bitcoin as a Tor Hidden Service on Ubuntu](https://blog.lopp.net/how-to-run-bitcoin-as-a-tor-hidden-service-on-ubuntu/) - by [@Lopp](https://twitter.com/Lopp)
