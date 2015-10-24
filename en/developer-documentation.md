---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-documentation
title: "Developer Documentation - Bitcoin"
breadcrumbs:
  - bitcoin
  - Developer Documentation 
end_of_page: |
  <script src="/js/jquery/jquery-1.11.2.min.js"></script>
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <script src="/js/devsearch.js"></script>
---
<div class="content_documentation">
  <link rel="stylesheet" href="/css/jquery-ui.min.css">

  <div class="content_documentation--header">
    <h1 class="content_documentation--title" id="developer-documentation">Developer Documentation</h1>
    <h2 class="content_documentation--subtitle">Find useful resources, guides and reference material for developers.</h2>
    <div class="content_documentation--search">
      <input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">
    </div>

    <ul class="content_documentation--header--menu">
      <li class="content_documentation--header--item">
        <a href="/en/developer-guide">
          <i class="fa fa-info-circle fa-2x"></i><span>Guide</span>
        </a>
      </li>
      <li class="content_documentation--header--item">
        <a href="/en/developer-reference">
          <i class="fa fa-book fa-2x"></i><span>Reference</span>
        </a>
      </li>
      <li class="content_documentation--header--item">
        <a href="/en/developer-examples">
          <i class="fa fa-code fa-2x"></i><span>Examples</span>
        </a>
      </li>
      <li class="content_documentation--header--item">
        <a href="/en/developer-glossary">
          <i class="fa fa-font fa-2x"></i><span>Glossary</span>
        </a>
      </li>
    </ul>
  </div>

  <div class="content_documentation--boxcontainer">
    
    <div class="content_documentation--infobox">
      <h2 id="block_chain" class="content_documentation--infobox--title">Block Chain</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#block-chain">Block Chain Guide</a></li>
        <li><a href="/en/developer-reference#block-chain">Block Chain Reference</a></li>
      </ul>
    </div>
  
    <div class="content_documentation--infobox">
      <h2 id="transactions" class="content_documentation--infobox--title">Transactions</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#transactions">Transactions Guide</a></li>
        <li><a href="/en/developer-reference#transactions">Transactions Reference</a></li>
        <li><a href="/en/developer-examples#transactions">Transaction Examples</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="contracts" class="content_documentation--infobox--title">Contracts</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#contracts">Contracts Guide</a></li>
        <li><a href="https://en.bitcoin.it/wiki/Contracts"><span class="fa fa-external-link"></span> More Contracts - Wiki</a></li>
        <li><a href="https://bitcoinj.github.io/working-with-micropayments"><span class="fa fa-external-link"></span> Micropayment Channel Example - bitcoin</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="wallets" class="content_documentation--infobox--title">Wallets</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#wallets">Wallets Guide</a></li>
        <li><a href="/en/developer-reference#wallets">Wallets Reference</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"><span class="fa fa-external-link"></span> HD Wallets - BIP32</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"><span class="fa fa-external-link"></span> Mnemonic Code - BIP39</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="payment-processing" class="content_documentation--infobox--title">Payment Processing</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#payment-processing">Payment Processing Guide</a></li>
        <li><a href="/en/developer-examples#payment-processing">Payment Processing Examples</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki"><span class="fa fa-external-link"></span> Payment Protocol - BIP70</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"><span class="fa fa-external-link"></span> Mnemonic Code - BIP39</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="operating_modes" class="content_documentation--infobox--title">Operating Modes</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#operating-modes">Operating Modes Guide</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="p2p-network" class="content_documentation--infobox--title">P2P Network</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#p2p-network">P2P Network Guide</a></li>
        <li><a href="/en/developer-reference#p2p-network">P2P Network Reference</a></li>
        <li><a href="/en/developer-examples#p2p-network">P2P Network Examples</a></li>
        <li><a href="https://en.bitcoin.it/wiki/Protocol_specification"><span class="fa fa-external-link"></span> Full Protocol Specification - Wiki</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="mining" class="content_documentation--infobox--title">Mining</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/developer-guide#mining">Mining Guide</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki"><span class="fa fa-external-link"></span> getblocktemplate Fundamentals - BIP22</a></li>
        <li><a href="https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki"><span class="fa fa-external-link"></span> getblocktemplate Pooled Mining - BIP23</a></li>
      </ul>
    </div>

    <div class="content_documentation--infobox">
      <h2 id="additional-resources" class="content_documentation--infobox--title">Additional resources</h2>
      <div class="content_documentation--infobox--icon">
        <img src="/img/icons/ico_simple.svg" class="titleicon" alt="Icon">
      </div>
      <ul class="content_documentation--infobox--list">
        <li><a href="/en/bitcoin-paper"><span class="fa fa-external-link"></span> Bitcoin: A Peer-to-Peer Electronic Cash System - Satoshi Nakamoto</a></li>
        <li><a href="https://github.com/bitcoin/bips#readme"><span class="fa fa-external-link"></span> Bitcoin Improvement Proposals - GitHub</a></li>
        <li><a href="https://github.com/minium/Bitcoin-Spec"><span class="fa fa-external-link"></span> Bitcoin Developer Reference (working paper) - Krzysztof Okupski</a></li>
        <li><a href="https://bitcoinj.github.io/#documentation"><span class="fa fa-external-link"></span> Bitcoinj Developer Documentation - bitcoinj.org</a></li>
        <li><a href="https://en.bitcoin.it/wiki/Category:Technical"><span class="fa fa-external-link"></span> Technical Pages - Wiki</a></li>
      </ul>
    </div>

  </div>

</div>