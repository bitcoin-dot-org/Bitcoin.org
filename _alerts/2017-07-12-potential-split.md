---
## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

title: "Potential network disruption"
shorturl: "potential-split"
active: true
banner: "Warning: potential network disruption starting July 31st"

## 7/12 to 7/28: "warning" (orange); 7/29 until resolution: "alert" (red)
bannerclass: "warning"
---
{% assign start='<span class="date">2017/08/01 00:00 UTC</span>' %}

*Last updated: <span class="date">2017/07/12 12:00 UTC</span>.  This
page will be updated when new information becomes available.  See the
[list of updates][].*

At {{start}}, Bitcoin [confirmation scores][] may become unreliable for
an unknown length of time.  This means that any bitcoins you receive
after that time may later disappear from your wallet or be a
type of bitcoin that other people will not accept as payment.

Once the situation is resolved, confirmation scores will either
automatically return to their normal reliability or there will be two
(or more) competing versions of Bitcoin.  In the former case, you may
return to using Bitcoin normally; in the latter case, you will need to
take extra steps in order to begin safely receiving bitcoins again.

This post currently describes what actions you can take to prepare for
this situation.  Subsequent to {{start}}, we will update this post as
best we can with relevant information, but you are also advised to
monitor other Bitcoin [news sites][] and [community resources][] for
updates and to cross-check all information, as someone may attempt to
spread false news in order to exploit the situation.

Remember that you alone are responsible for the safety of your bitcoins,
and that if you lose control of them for any reason, there is nothing
the operators or contributors to this website can do to help you.

*Note:* there is a chance a milder level of disruption could start
between now and {{start}}. If that is the case, this post will be
updated with details.

## Preparation

1. If you accept bitcoins as payments, we recommend that you stop
accepting Bitcoin payments at least 12 hours before {{start}}, although
24 to 48 hours earlier may be safer.  This will give time for all
pending payments to confirm on the Bitcoin block chain before the event.

1. If you send bitcoins as payments, note that many services may stop
accepting bitcoins at {{start}} or earlier.

1. Be wary of storing your bitcoins on an exchange or any service that
doesn't allow you to make a local backup copy of your private keys.  If
they accept transactions during the event, they could lose money and
will likely spread those loses across all their users.  If there end up
being two or more competing versions of Bitcoin, then they may refuse to
give you your bitcoins on versions they don't like.

1. Bitcoin may experience significant price fluctuations in relation to
other currencies.  Learn more about [price volatility][] and ensure you
aren't holding more bitcoin than you can afford to lose.

## During the event

1. Do not trust any payments you receive after {{start}} until the situation
is resolved.  No matter how many confirmations the new payment says it
has, it can disappear from your wallet at any point up until the
situation is resolved.

1. Try not to send any payments.  During the event there may be two or
more different types of bitcoin and you may send all of the different
types to a recipient who only expects one type.  This would benefit the
recipient at your expense.

1. Be wary of offers to allow you to invest in the outcome of the event
by "splitting" your coins.  Some of these offers may be scams, and
software claiming to split your coins can also steal them.

## After the event

We will update this section with more information after {{start}}. Please
monitor this page accordingly and wait until multiple news sources that you
trust have stated that the event is resolved before returning to normal Bitcoin
use.

## Document history

A [full history][] of this document is available.  The following points
summarize major changes, with the most recent changes being listed
first.

- <span class="date">2017/07/12 12:00 UTC</span>: initial version.

[full history]: https://github.com/bitcoin-dot-org/bitcoin.org/commits/master/_alerts/2017-07-12-potential-split.md
[list of updates]: #document-history
[news sites]: /en/resources#news
[community resources]: /en/community
[confirmation scores]: /en/you-need-to-know#instant
[price volatility]: /en/you-need-to-know#volatile

<script src="/js/jquery/jquery-1.11.2.min.js"></script>
<script>
// Localize dates
$(".date").each(function() {
  // Try to parse the string as a date
  epoch = Date.parse($(this).text());
  // Only convert the string to localtime if it's a number
  if (isNaN(epoch) == false) {
    var utcdate=new Date(epoch);
    var localedate = utcdate.toString();
    $(this).text(localedate);
  }
});
</script>
