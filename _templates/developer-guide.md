---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
id: developer-guide
breadcrumbs:
  - bitcoin
  - dev docs
  - dev docs guides
show_fragments: true
show_toc: true
---

{% assign filename="_templates/developer-guide.md" %}

<script>handleDevDocsRedirect(window.location.hash.substring(1).toLowerCase());</script>

<div class="hero">
  <div class="container hero-container">
    <h1>{% translate pagetitle %}</h1>
    <p class="summarytxt">{% translate summary %}</p>
  </div>
</div>

<div class="container">
  <div class="row card-row">

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_blockchain.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="blockchain">{% translate blockchaintitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/blockchain-guide">{% translate readblockchain %}</a></div>
      <p>{% translate blockchainsummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_transaction.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="transactions">{% translate transactionstitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/transactions-guide">{% translate readtransactions %}</a></div>
      <p>{% translate transactionssummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_contract.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="contracts">{% translate contractstitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/contracts-guide">{% translate readcontracts %}</a></div>
      <p>{% translate contractssummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_wallet.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="wallets">{% translate walletstitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/wallets-guide">{% translate readwallets %}</a></div>
      <p>{% translate walletssummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_payment.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="payment-processing">{% translate paymenttitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/payment-processing-guide">{% translate readpayments %}</a></div>
      <p>{% translate paymentsummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_gear.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="operating-modes">{% translate operatingtitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/operating-modes-guide">{% translate readoperating %}</a></div>
      <p>{% translate operatingsummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/network.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="p2p-network">{% translate p2ptitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/p2p-network-guide">{% translate readp2p %}</a></div>
      <p>{% translate p2psummary %}</p>
    </div>

    <div class="card devguide-card">
      <img class="titleicon" src="/img/icons/ico_mining.svg?{{site.time | date: '%s'}}" alt="Icon" />
      <h2 id="mining">{% translate miningtitle %}</h2>
      <!-- no subhead-links here -->
      <div class="btn-container"><a class="btn btn-bright" href="/en/mining-guide">{% translate readmining %}</a></div>
      <p>{% translate miningsummary %}</p>
    </div>

  </div>
</div>
