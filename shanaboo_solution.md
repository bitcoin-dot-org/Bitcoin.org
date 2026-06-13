 ```diff
--- a/_templates/earn-bitcoin.html
+++ b/_templates/earn-bitcoin.html
@@ -0,0 +1,6 @@
+---
+layout: base
+id: earn-bitcoin
+---
+
+{% include templates/earn-bitcoin.html %}
--- a/_templates/earn-bitcoin.html
+++ b/_templates/earn-bitcoin.html
@@ -0,0 +1,6 @@
+---
+layout: base
+id: earn-bitcoin
+---
+
+{% include templates/earn-bitcoin.html %}
--- a/_includes/templates/earn-bitcoin.html
+++ b/_includes/templates/earn-bitcoin.html
@@ -0,0 +1,89 @@
+<div class="hero">
+  <div class="container hero-container">
+    <h1>{% translate pagetitle %}</h1>
+    <p class="summary">{% translate pagedesc %}</p>
+  </div>
+</div>
+
+<div class="container">
+  <div class="row card-row">
+    <div class="card">
+      <img src="/img/icons/ico_sell.svg?{{site.time | date: '%s'}}" alt="Sell" />
+      <h2 id="sell">{% translate sell %}</h2>
+      <p>{% translate selldesc %}</p>
+    </div>
+
+    <div class="card">
+      <img src="/img/icons/ico_work.svg?{{site.time | date: '%s'}}" alt="Work" />
+      <h2 id="work">{% translate work %}</h2>
+      <p>{% translate workdesc %}</p>
+    </div>
+
+    <div class="card">
+      <img src="/img/icons/ico_affiliate.svg?{{site.time | date: '%s'}}" alt="Affiliate" />
+      <h2 id="affiliate">{% translate affiliate %}</h2>
+      <p>{% translate affiliatedesc %}</p>
+    </div>
+  </div>
+
+  <div class="row card-row">
+    <div class="card">
+      <img src="/img/icons/ico_mining.svg?{{site.time | date: '%s'}}" alt="Mining" />
+      <h2 id="mining">{% translate mining %}</h2>
+      <p>{% translate miningdesc %}</p>
+    </div>
+
+    <div class="card">
+      <img src="/img/icons/ico_gambling.svg?{{site.time | date: '%s'}}" alt="Gambling" />
+      <h2 id="gambling">{% translate gambling %}</h2>
+      <p>{% translate gamblingdesc %}</p>
+    </div>
+
+    <div class="card">
+      <img src="/img/icons/ico_faucets.svg?{{site.time | date: '%s'}}" alt="Faucets" />
+      <h2 id="faucets">{% translate faucets %}</h2>
+      <p>{% translate faucetsdesc %}</p>
+    </div>
+  </div>
+</div>
+
+<div class="container">
+  <h2 id="platforms">{% translate platforms %}</h2>
+  <p>{% translate platformsdesc %}</p>
+
+  <div class="row row-continous">
+    <div class="card">
+      <h3 id="freelance">{% translate freelance %}</h3>
+      <p>{% translate freelancedesc %}</p>
+      <ul>
+        <li><a href="https://www.coinmall.com/">CoinMall</a> - {% translate coinmall %}</li>
+        <li><a href="https://www.xbtfreelancer.com/">XBTFreelancer</a> - {% translate xbtfreelancer %}</li>
+        <li><a href="https://crypto.jobs/">Crypto Jobs</a> - {% translate cryptojobs %}</li>
+        <li><a href="https://www.cryptogrind.com/">CryptoGrind</a> - {% translate cryptogrind %}</li>
+      </ul>
+    </div>
+
+    <div class="card">
+      <h3 id="marketplaces">{% translate marketplaces %}</h3>
+      <p>{% translate marketplacesdesc %}</p>
+      <ul>
+        <li><a href="https://www.openbazaar.org/">OpenBazaar</a> - {% translate openbazaar %}</li>
+        <li><a href="https://purse.io/">Purse</a> - {% translate purse %}</li>
+        <li><a href="https://bitify.com/">Bitify</a> - {% translate bitify %}</li>
+      </ul>
+    </div>
+
+    <div class="card">
+      <h3 id="other">{% translate other %}</h3>
+      <p>{% translate otherdesc %}</p>
+      <ul>
+        <li><a href="https://www.steadlads.com/">Steadlads</a> - {% translate steadlads %}</li>
+        <li><a href="https://www.bitcoinglobal.com/">Bitcoin Global</a> - {% translate bitcoinglobal %}</li>
+        <li><a href="https://www.earncrypto.com/">EarnCrypto</a> - {% translate earncrypto %}</li>
+      </ul>
+    </div>
+  </div>
+</div>
--- a/_translations/en.yml
+++ b/_translations/en.yml
@@ -0,0 +1,50 @@
+---
+en:
+  earn-bitcoin:
+    title: "Earn Bitcoin"
+    pagetitle: "Earn Bitcoin"
+    pagedesc: "Discover ways to earn Bitcoin through selling goods, freelancing, affiliate programs, and more."
+    summary: "Not everyone who is interested in Bitcoin is able to buy Bitcoin. This page provides information on how to earn Bitcoin."
+    sell: "Sell Products or Services"
+    selldesc: "The most straightforward way to earn Bitcoin is to sell products or services in exchange for Bitcoin. Whether you're a developer, designer, writer, or have physical goods to sell, you can accept Bitcoin as payment."
+    work: "Freelance Work"
+    workdesc: "Many platforms now connect freelancers with clients who pay in Bitcoin. Offer your skills in programming, design, writing, marketing, or other services and get paid in Bitcoin."
+    affiliate: "Affiliate Programs"
+    affiliatedesc: "Promote Bitcoin-related products and services and earn commissions in Bitcoin. Many exchanges, wallets, and services offer affiliate programs that pay in cryptocurrency."
+   