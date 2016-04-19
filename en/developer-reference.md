---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-reference
title: "Developer Reference - Bitcoin"
breadcrumbs:
  - bitcoin
  - dev docs
  - Reference
end_of_page: |
  <script src="/js/jquery/jquery-1.11.2.min.js"></script>
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <script src="/js/devsearch.js"></script>
  <script>updateToc();</script>
---
<div class="content_guide">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<!-- This should be empty, but comment it out just in case: {% include helpers/vars.md %} -->

<div class="content_guide--header">
  <h1 class="content_guide--title" id="developer-documentation">Developer Documentation</h1>
  <h2 class="content_guide--subtitle">Find useful resources, guides and reference material for developers.</h2>
  <div class="content_guide--search">
    <input id="glossary_term" class="glossary_term" placeholder="Search">
  </div>
  <ul class="content_guide--header--menu">
    <li class="content_guide--header--item">
      <a href="/en/developer-guide">
        <i class="fa fa-info-circle fa-2x"></i><span>Guide</span>
      </a>
    </li>
    <li class="content_guide--header--menu--item--active">
      <a href="/en/developer-reference">
        <i class="fa fa-book fa-2x"></i><span>Reference</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-examples">
        <i class="fa fa-code fa-2x"></i><span>Examples</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-glossary">
        <i class="fa fa-font fa-2x"></i><span>Glossary</span>
      </a>
    </li>
  </ul>
</div>


<div class="content_guide--body">

<div markdown="1" id="toc" class="toc"><div markdown="1">
  <div class="content_guide--toc--top">
    <a class="content_guide--toc--back" href="/en/developer-documentation">Return to Overview</a>
    <h2 class="content_guide--toc--title">Reference</h2>
    <h3 class="content_guide--toc--subtitle">Find technical details and API documentation.</h3>
    <ul class="content_guide--toc--buttons">
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report Issue</a></li>
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit GitHub</a></li>
    </ul>
  </div>

* Table of contents
{:toc}

</div></div>

<div markdown="1" class="toccontent">

{% include devdoc/fragment_reviews_needed.md %}

{% include devdoc/ref_intro.md %}

{% include devdoc/ref_block_chain.md %}

{% include devdoc/ref_transactions.md %}

{% include devdoc/ref_wallets.md %}

{% include devdoc/ref_p2p_networking.md %}

{% include devdoc/bitcoin-core/api-intro.md %}

{% include devdoc/bitcoin-core/rpcs/intro.md %}

{% include devdoc/bitcoin-core/rpcs/quick-ref.md %}

#### RPCs
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include devdoc/bitcoin-core/rpcs/rpcs/addmultisigaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/addnode.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/backupwallet.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/createmultisig.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/createrawtransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/decoderawtransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/decodescript.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/dumpprivkey.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/dumpwallet.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/encryptwallet.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/estimatefee.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/estimatepriority.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/generate.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getaccountaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getaccount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getaddressesbyaccount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getbalance.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getbestblockhash.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getblock.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getblockchaininfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getblockcount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getblockhash.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getblocktemplate.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getchaintips.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getconnectioncount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getdifficulty.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getgenerate.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/gethashespersec.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getmempoolinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getmininginfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getnettotals.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getnetworkhashps.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getnetworkinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getnewaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getpeerinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getrawmempool.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getrawtransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getreceivedbyaccount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/gettransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/gettxout.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/gettxoutproof.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getwalletinfo.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/getwork.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/help.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/importaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/importprivkey.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/importwallet.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/keypoolrefill.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listaccounts.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listaddressgroupings.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listlockunspent.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listreceivedbyaccount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listsinceblock.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listtransactions.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/listunspent.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/lockunspent.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/move.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/ping.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/prioritisetransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/sendfrom.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/sendmany.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/sendrawtransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/sendtoaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/setaccount.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/setgenerate.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/settxfee.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/signmessage.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/signrawtransaction.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/stop.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/submitblock.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/validateaddress.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/verifychain.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/verifymessage.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/verifytxoutproof.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/walletlock.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/walletpassphrase.md %}

{% include devdoc/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md %}

{% include devdoc/bitcoin-core/rest/intro.md %}

{% include devdoc/bitcoin-core/rest/quick-reference.md %}

#### Requests
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include devdoc/bitcoin-core/rest/requests/get_block.md %}

{% include devdoc/bitcoin-core/rest/requests/get_block-notxdetails.md %}

{% include devdoc/bitcoin-core/rest/requests/get_tx.md %}

{% include references.md %}
{{site.glossary_links}}

</div>
</div>
</div>
