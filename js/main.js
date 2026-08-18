// This file is licensed under the MIT License (MIT) available on
// https://opensource.org/licenses/MIT.

// This file is used for javascript code
// necessary for some pages to work properly.

"use strict";

function getWidth(a) {
  // Return the integer value of the computed width of a DOM node.
  // Ex. getWidth(node);
  var w = getStyle(a, 'width');
  if (w.indexOf('px') !== -1) return parseInt(w.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];
  for (var i = 0; i < 4; i++) {
    p[i] = (p[i].indexOf('px') !== -1) ? parseInt(p[i]) : 0;
  }
  return Math.max(0, a.offsetWidth - p[1] - p[3]);
}

function getHeight(a) {
  // Return the integer value of the computed height of a DOM node.
  // Ex. getHeight(node);
  var h = getStyle(a, 'height');
  if (h.indexOf('px') !== -1) return parseInt(h.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];
  for (var i = 0; i < 4; i++) {
    p[i] = (p[i].indexOf('px') !== -1) ? parseInt(p[i]) : 0;
  }
  return Math.max(0, a.offsetHeight - p[0] - p[2]);
}

function getLeft(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getLeft(node);
  var b = a.offsetLeft;
  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetLeft;
  }
  return b;
}

function getTop(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getTop(node);
  var b = a.offsetTop;
  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetTop;
  }
  return b;
}

function getPageYOffset() {
  // Return the integer value for the vertical position of the scroll bar.
  return window.pageYOffset || document.documentElement.scrollTop;
}

function getPageXOffset() {
  // Return the integer value for the horizontal position of the scroll bar.
  return window.pageXOffset || document.documentElement.scrollLeft;
}

function getWindowY() {
  // Return the integer value for the browser window height.
  return window.innerHeight || document.documentElement.clientHeight;
}

function getWindowX() {
  // Return the integer value for the browser window width.
  return window.innerWidth || document.documentElement.clientWidth;
}

function isMobile() {
  // Return true if the mobile CSS stylesheet is used.
  if (getStyle(document.getElementById('detectmobile'), 'display') !== 'none') return true;
  return false;
}

function scrollToNode(t) {
  // Scroll to any node on the page.
  var status = document.body.getAttribute('data-scrollstatus');
  if (status !== null && status !== '') {
    clearInterval(document.body.getAttribute('data-scrollstatus'));
    document.body.removeAttribute('data-scrollstatus');
  }
  var delay = 800;
  var py = getPageYOffset();
  var fy = getTop(t);
  var dy = fy - py;
  var x = getPageXOffset();
  var oti = new Date().getTime();
  document.body.setAttribute('data-scrollstatus', setInterval(function() {
    var nti = new Date().getTime() - oti;
    if (nti >= delay) {
      window.scrollTo(x, fy);
      clearInterval(document.body.getAttribute('data-scrollstatus'));
      document.body.removeAttribute('data-scrollstatus');
      return;
    }
    var p = nti / delay;
    p = p * (1 + (0.5 * (1 - p)));
    window.scrollTo(x, (py + (dy * p)).toFixed(0));
  }, 10));
}

function supportCSS(id) {
  // Return true if the browser supports given CSS feature.
  var domPrefixes = 'Webkit Moz ms O'.split(' ');
  var nd = document.createElement('DIV');
  id = id.toLowerCase();
  if (nd.style[id] !== undefined) return true;
  var idc = id.charAt(0).toUpperCase() + id.substr(1);
  for (var i = 0, n = domPrefixes.length; i < n; i++) {
    if (nd.style[domPrefixes[i] + idc] !== undefined) return true;
  }
  return false;
}

function loadYoutubeVideo(e) {
  var open = document.querySelector(".mainvideo-btn-open");
  var close = document.querySelector(".mainvideo-btn-close");
  var modal = document.querySelector(".modal");
  var video = document.querySelector(".modal-video");
  var modalOverlay = document.querySelector(".modal-overlay");

  if (e.target === open) {
    modal.classList.remove("closed");
    video.src = open.getAttribute("data-youtubeurl");
    modalOverlay.classList.remove("closed");
  } else if (e.target === close) {
    modal.classList.add("closed");
    video.src = "";
    modalOverlay.classList.add("closed");
  }
}

function expandBox(t) {
  // Expand or shrink box.
  t.style.transition = t.style.MozTransition = t.style.WebkitTransition = 'all 0s ease 0s';
  if (t.className.indexOf('expanded') === -1) addClass(t, 'expanded');
  else removeClass(t, 'expanded');

  setTimeout(function() {
    t.style.transition = t.style.MozTransition = t.style.WebkitTransition = '';
  }, 20);
}

function boxShow(e) {

  function init(e) {
    var t = getEvent(e, 'target');
    while (t.nodeName !== 'DIV') t = t.parentNode;
    expandBox(t);
    cancelEvent(e);
  }
  document.querySelectorAll(".boxexpand > h1:first-child").forEach(function(accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
  document.querySelectorAll(".boxexpand > h2:first-child").forEach(function(accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
  document.querySelectorAll(".boxexpand > h3:first-child").forEach(function(accordionToggle) {
    return accordionToggle.addEventListener("click", init);
  });
}

function faqShow(e) {
  // Display the content of a question in the FAQ at user request.
  function init(e) {
    var t = getEvent(e, 'target');
    while (t.nodeType !== 1 || t.nodeName !== 'DIV') t = t.nextSibling;
    expandBox(t);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function materialShow(e) {
  // Display more materials on the "Press center" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
      p = t;
    while (p.nodeType !== 1 || p.nodeName !== 'DIV') p = p.parentNode;
    expandBox(p);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function librariesShow(e) {
  // Display more open source projects on the "Development" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
      p = t;
    while (p.nodeType !== 1 || p.nodeName !== 'UL') p = p.parentNode;
    expandBox(p);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function freenodeShow(e) {
  // Display freenode chat window on the "Development" page at user request.
  document.getElementById('chatbox').innerHTML = '<iframe style=width:98%;min-width:400px;height:600px src="https://webchat.freenode.net/?channels=bitcoin-dev" />';
  cancelEvent(e);
}

function updateToc() {
    // Update table of content active entry and browser url on scroll.
    var pageoffset;
    var windowy;
    var toc;
    var fallback;
    var first;
    var last;
    var closer;
    function init() {
        setenv();
        updatehistory();
        updatetoc();
    }
    // Set variables.
    function setenv() {
        pageoffset = getPageYOffset();
        windowy = getWindowY();
        toc = document.getElementById('toc');
        fallback = document.getElementsByTagName("H2")[0] || document.getElementsByTagName("H3")[0];
        first = [fallback, getTop(fallback)];
        last = [fallback, getTop(fallback)];
        closer = [fallback, getTop(fallback)];
        // Find all titles in toc.
        var nodes = [];
        var tags = ['H2', 'H3', 'H4', 'H5', 'H6'];
        for (var i = 0, n = tags.length; i < n; i++) {
            for (var ii = 0, t = document.getElementsByTagName(tags[i]), nn = t.length; ii < nn; ii++) {
                if (t[ii].className.indexOf('no_toc') !== -1) continue;
                nodes.push(t[ii]);
            }
        }
        // Find first title, last title and closer title.
        for (var i = 0, n = nodes.length; i < n; i++) {
            if (!nodes[i].id) continue;
            var top = getTop(nodes[i]);
            if (top < first[1]) first = [nodes[i], top];
            if (top > last[1]) last = [nodes[i], top];
            if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
        }
        // Set closer title to first or last title if at the top or bottom of the page.
        if (pageoffset < first[1]) closer = [first[0], first[1]];
        if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]];
    }
    // Update toc position and set active toc entry.
    function updatetoc() {
        // Set bottom and top to fit within window and not overflow its parent node.
        var div = toc.getElementsByTagName('DIV')[0];
        var sidebarHeight = document.querySelector(".sidebar").offsetHeight;
        var footerTop = document.querySelector(".footer").offsetTop;

        if (window.scrollY >= getTop(toc) - 20 && window.scrollY + sidebarHeight + 20 <= footerTop) {
          addClass(div, "scroll");
        } else {
          removeClass(div, "scroll");
        }

        // Remove .active class from toc and find new active toc entry.
        var a = false;
        for (var i = 0, t = toc.getElementsByTagName('*'), n = t.length; i < n; i++) {
            removeClass(t[i], 'active');
            if (t[i].nodeName === 'A' && t[i].getAttribute('href') === '#' + closer[0].id && closer[0].parentNode.classList.contains("expanded")) {
              a = t[i];
            }
        }
        if (a === false) return;
        // Set .active class on new active toc entry.
        var nd = a;
        while (nd.parentNode.nodeName === 'LI' || nd.parentNode.nodeName === 'UL') {
            addClass(nd, 'active');
            nd = nd.parentNode;
        }
        // Auto-scroll in toc to keep active toc entry visible.
        var nd = a;
        var otop = nd.offsetTop;
        while (nd.offsetParent !== div && nd.offsetParent) {
            nd = nd.offsetParent;
            otop += nd.offsetTop;
        }
        var bdiff = getHeight(a) + otop - div.scrollTop - getHeight(div);
        var tdiff = getHeight(a) - otop + div.scrollTop;
        if (tdiff > 0 || bdiff > 0) div.scrollTop -= tdiff;
    }
    // Update browser url.
    function updatehistory() {
        // Don't call window.history if not supported.
        if (!window.history || !window.history.replaceState) return;
        // Don't update window url when it doesn't need to be updated.
        if (new RegExp('#' + closer[0].id + '$').test(window.location.href.toString())) return;
        // Don't update window url when the window is over the first title in the page.
        if (pageoffset < first[1]) return;
        // Don't update window url when page is not loaded, or user just clicked a url.
        if (!toc.hasAttribute('data-timestamp') || toc.getAttribute('data-timestamp') > new Date().getTime() - 1000) return;
        window.history.replaceState(null, null, '#' + closer[0].id);
    }
    // Reset timestamp on page load and each time the user clicks a url.
    function evtimestamp() {
        toc = document.getElementById('toc');
        document.getElementById('toc').setAttribute('data-timestamp', new Date().getTime());
    }
    addEvent(window, 'scroll', init);
    addEvent(window, 'popstate', evtimestamp);
    addEvent(window, 'load', evtimestamp);
}

function updateIssue(e) {
  // Update GitHub issue link pre-filled with current page location.
  var t = getEvent(e, 'target');
  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?body=' + encodeURIComponent('Location: ' + window.location.href.toString() + "\n\n");
}

function updateSource(e) {
  // Update GitHub source file link pre-filled with current page location.
  if (!document.getElementsByClassName) return;
  var t = getEvent(e, 'target'),
    nodes = document.getElementsByClassName('sourcefile'),
    pageoffset = Math.max(0, getPageYOffset() + 100),
    windowy = getWindowY(),
    fallback = nodes[0],
    first = [fallback, getTop(fallback)],
    last = [fallback, getTop(fallback)],
    closer = [fallback, getTop(fallback)];
  // Find first, last and closer node.
  for (var i = 0, n = nodes.length; i < n; i++) {
    var top = getTop(nodes[i]);
    if (top < first[1]) first = [nodes[i], top];
    if (top > last[1]) last = [nodes[i], top];
    if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
  }
  // Set closer title to first or last title if at the top or bottom of the page.
  if (pageoffset < first[1]) closer = [first[0], first[1]];
  if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]];
  // Set updated url to source file.
  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/' + closer[0].getAttribute('data-sourcefile');
}

function disclaimerClose(e) {
  // Auto close temporary disclaimer in devel-docs.
  if (e) cancelEvent(e);
  var t = document.getElementById('develdocdisclaimer');
  t.parentNode.removeChild(t);
  if (typeof(Storage) === 'undefined') return;
  sessionStorage.setItem('develdocdisclaimerclose', '1');
}

function disclaimerAutoClose() {
  // Auto close temporary disclaimer in devel-docs if session says so.
  if (typeof(Storage) === 'undefined') return;
  if (sessionStorage.getItem('develdocdisclaimerclose') === '1') disclaimerClose();
}

function walletRotate() {
  // Rotate wallets once a day.
  var ar = {
    1: [],
    2: [],
    3: [],
    4: []
  };
  for (var i = 0, nds = document.getElementById('wallets').childNodes, n = nds.length; i < n; i++) {
    if (nds[i].nodeType !== 1) continue;
    ar[parseInt(nds[i].getAttribute('data-walletlevel'))].push(nds[i]);
  }
  var sum = Math.floor(new Date() / 86400000);
  for (var k in ar) {
    if (!ar.hasOwnProperty(k)) continue;
    if (ar[k].length === 0) continue;
    var pre = ar[k][ar[k].length - 1].nextSibling;
    for (i = 0, n = sum % ar[k].length; i < n; i++) ar[k][i].parentNode.insertBefore(ar[k][i], pre);
  }
}

function walletScoreListener(e) {
   // Listen for events on wallet scores and display them on tap.
   var init = function(e) {
     var t = getEvent(e, 'target');
     while (!t.parentNode.parentNode.parentNode.id) t = t.parentNode;
     (t.className.indexOf('hover') === -1) ? addClass(t, 'hover'): removeClass(t, 'hover');
   };
   onTouchClick(e, init);
 }

function makeEditable(e) {
  // An easter egg that makes the page editable when user click on the page and hold their mouse button for one second.
  // This trick allows translators and writers to preview their work.
  e = e || window.event;
  switch (getEvent(e, 'type')) {
    case 'mousedown':
      if ((e.which && e.which === 3) || (e.button && e.button === 2)) return;
      var t = getEvent(e, 'target');
      while (t.parentNode) {
        if (getStyle(t, 'overflow') === 'auto' || getStyle(t, 'overflow-y') === 'auto' || getStyle(t, 'overflow-x') === 'auto') return;
        t = t.parentNode;
      }
      addEvent(document.body, 'mouseup', makeEditable);
      addEvent(document.body, 'mousemove', makeEditable);
      document.body.setAttribute('timeoutEdit', setTimeout(function() {
        removeEvent(document.body, 'mouseup', makeEditable);
        removeEvent(document.body, 'mousemove', makeEditable);
        var c = document.getElementById('content');
        c.contentEditable = true;
        c.style.borderColor = '#bfbfbf';
        setTimeout(function() {
          c.style.borderColor = '';
        }, 200);
      }, 1000));
      break;
    case 'mouseup':
    case 'mousemove':
      removeEvent(document.body, 'mouseup', makeEditable);
      removeEvent(document.body, 'mousemove', makeEditable);
      clearTimeout(document.body.getAttribute('timeoutEdit'));
      break;
  }
}

// Add makeEditable event listener
var xint = setInterval(function() {
  if (!document.body) return;
  addEvent(document.body, 'mousedown', makeEditable);
  clearInterval(xint);
}, 200);

var donationUsdRate = null;
var donationTickerRequest = null;
var donationModalOpener = null;
var donationModalOpenTimer = null;
var donationBodyOverflow = '';
var donationBannerStorageKey = 'bitcoinorg-donation-banner-dismissed-at';

function parseDonationAmount(value) {
    var normalized = String(value || '').replace(',', '.').replace(/^\s+|\s+$/g, '');
    if (!/^(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
        return null;
    }

    var amount = parseFloat(normalized);
    return !isNaN(amount) && amount > 0 ? amount : null;
}

function formatDonationBtc(value) {
    var amount = value.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
    return amount === '0' ? '' : amount;
}

function donationUsdToBtc(amount) {
    var amountUsd = parseDonationAmount(amount);
    if (amountUsd === null || donationUsdRate === null) {
        return '';
    }
    return formatDonationBtc(amountUsd / donationUsdRate);
}

function donationBtcToUsd(amount) {
    var amountBtc = parseDonationAmount(amount);
    if (amountBtc === null || donationUsdRate === null) {
        return '';
    }
    return (amountBtc * donationUsdRate).toFixed(2);
}

function generateDonationUrl(address, amountBtc, message) {
    var result = [address];
    var parsedAmount = parseDonationAmount(amountBtc);
    var formattedAmount = parsedAmount === null ? '' : formatDonationBtc(parsedAmount);

    if (formattedAmount !== '') {
        result.push('?amount=' + formattedAmount);
    }

    message = message || '';
    if (message !== '') {
        result.push(result.length === 1 ? '?' : '&');
        result.push('message=' + encodeURIComponent(message));
    }

    return result.join('');
}

function generateDonationQrCode() {
    var qrcodeContainer = $('#donation-qr-code');
    if (!qrcodeContainer.length) {
        return;
    }

    var address = qrcodeContainer.data('address');
    var amount = $('#donation-input-amount-btc').val();
    var message = $('#donation-input-message').val();
    var text = 'bitcoin:' + generateDonationUrl(address, amount, message);

    $('.donation-wallet-btn').attr('href', text);
    qrcodeContainer.empty();

    if ($.fn.qrcode) {
        qrcodeContainer.qrcode({
            width: 150,
            height: 150,
            text: text
        });
    }
}

function setDonationRateStatus(message, isError) {
    $('#donation-rate-status')
        .text(message || '')
        .toggleClass('is-error', !!isError);
}

function clearDonationSelectedAmount() {
    $('[data-amount-usd]')
        .removeClass('is-selected')
        .attr('aria-pressed', 'false');
}

function selectDonationAmount(button) {
    clearDonationSelectedAmount();
    $(button)
        .addClass('is-selected')
        .attr('aria-pressed', 'true');
}

function applyDonationUsdAmount(amountUsd) {
    var modal = $('#donation-modal');
    var amountBtc = donationUsdToBtc(amountUsd);

    $('#donation-input-amount-usd').val(amountUsd);

    if (amountBtc !== '') {
        $('#donation-input-amount-btc').val(amountBtc);
        setDonationRateStatus('', false);
    } else {
        $('#donation-input-amount-btc').val('');
        setDonationRateStatus(
            modal.data(donationTickerRequest ? 'rate-loading' : 'rate-unavailable'),
            !donationTickerRequest
        );
    }

    generateDonationQrCode();
}

function refreshDonationAmountButtons() {
    $('[data-amount-usd]').each(function() {
        var amountBtc = donationUsdToBtc($(this).data('amount-usd'));
        $('.donation-amount-usd-in-btc', this).text(amountBtc ? amountBtc + ' BTC' : '… BTC');
    });
}

function loadTickerPrices() {
    var modal = $('#donation-modal');

    if (donationUsdRate !== null) {
        refreshDonationAmountButtons();
        return;
    }

    if (donationTickerRequest) {
        return;
    }

    setDonationRateStatus(modal.data('rate-loading'), false);

    donationTickerRequest = $.ajax({
        url: 'https://blockchain.info/ticker',
        dataType: 'json',
        timeout: 6000
    })
        .done(function(data) {
            var rate = data && data.USD ? parseFloat(data.USD.last) : NaN;

            if (isNaN(rate) || rate <= 0) {
                setDonationRateStatus(modal.data('rate-unavailable'), true);
                return;
            }

            donationUsdRate = rate;
            refreshDonationAmountButtons();

            var amountUsd = $('#donation-input-amount-usd').val();
            if (parseDonationAmount(amountUsd) !== null) {
                applyDonationUsdAmount(amountUsd);
            } else {
                setDonationRateStatus('', false);
            }
        })
        .fail(function() {
            setDonationRateStatus(modal.data('rate-unavailable'), true);
        })
        .always(function() {
            donationTickerRequest = null;
        });
}

function getDonationFocusableElements() {
    return $('#donation-modal')
        .find('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')
        .filter(':visible');
}

function handleDonationModalKeydown(event) {
    if (event.keyCode === 27) {
        closeDonationModal();
        return;
    }

    if (event.keyCode !== 9) {
        return;
    }

    var focusable = getDonationFocusableElements();
    if (!focusable.length) {
        event.preventDefault();
        return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === $('#donation-modal')[0])) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function openDonationModal(event) {
    var modal = $('#donation-modal');
    if (!modal.length || modal.css('display') !== 'none' || modal.hasClass('open')) {
        return;
    }

    donationModalOpener = event && event.currentTarget ? event.currentTarget : document.activeElement;
    donationBodyOverflow = document.body.style.overflow;

    var drop = $('<div class="modal-drop" />');
    $('body')
        .append(drop)
        .css('overflow', 'hidden');

    modal
        .css('display', 'block')
        .attr('aria-hidden', 'false');

    drop.on('click', closeDonationModal);
    $(document).on('keydown.donationModal', handleDonationModalKeydown);

    clearTimeout(donationModalOpenTimer);
    donationModalOpenTimer = setTimeout(function() {
        drop.css('opacity', 1);
        modal
            .removeClass('hidden')
            .addClass('open')
            .focus();
    }, 0);

    loadTickerPrices();
    generateDonationQrCode();
}

function closeDonationModal() {
    var drop = $('.modal-drop');
    var modal = $('#donation-modal');

    if (!modal.length || modal.css('display') === 'none' || modal.attr('aria-hidden') === 'true') {
        return;
    }

    clearTimeout(donationModalOpenTimer);
    donationModalOpenTimer = null;
    drop.css('opacity', 0);
    modal
        .addClass('hidden')
        .removeClass('open')
        .attr('aria-hidden', 'true');

    document.body.style.overflow = donationBodyOverflow;
    $(document).off('keydown.donationModal');

    setTimeout(function() {
        drop.remove();
        modal.css('display', 'none');

        if (donationModalOpener && document.documentElement.contains(donationModalOpener)) {
            donationModalOpener.focus();
        }
    }, 180);
}

function fallbackCopyDonationAddress(address) {
    var input = document.createElement('textarea');
    input.value = address;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);

    var copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (error) {
        copied = false;
    }

    document.body.removeChild(input);
    return copied;
}

function markDonationAddressCopied(button, copied) {
    var status = $('#donation-copy-status');
    var defaultLabel = $(button).data('default-label');
    var message = copied ? $(button).data('copied-label') : $(button).data('failed-label');

    status
        .text(message)
        .toggleClass('is-error', !copied);

    if (copied) {
        $(button).text(message);
        setTimeout(function() {
            $(button).text(defaultLabel);
            status.text('');
        }, 2000);
    }
}

function copyDonationAddress(button) {
    var address = $('#donation-btc-address-text').text();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address)
            .then(function() {
                markDonationAddressCopied(button, true);
            })
            .catch(function() {
                markDonationAddressCopied(button, fallbackCopyDonationAddress(address));
            });
    } else {
        markDonationAddressCopied(button, fallbackCopyDonationAddress(address));
    }
}

function dismissDonationBanner() {
    var banner = $('.donation-container');
    banner.addClass('is-dismissed').attr('aria-hidden', 'true');

    try {
        window.localStorage.setItem(donationBannerStorageKey, String(new Date().getTime()));
    } catch (error) {
        // The banner still closes when storage is unavailable.
    }
}

function initDonationUI() {
    var modal = $('#donation-modal');
    if (!modal.length) {
        return;
    }

    var banner = $('.donation-container');
    if (banner.length) {
        var dismissalDays = parseInt(banner.data('dismissal-days'), 10) || 14;

        try {
            var dismissedAt = parseInt(window.localStorage.getItem(donationBannerStorageKey), 10);
            var dismissalDuration = dismissalDays * 24 * 60 * 60 * 1000;

            if (!isNaN(dismissedAt) && new Date().getTime() - dismissedAt < dismissalDuration) {
                banner.addClass('is-dismissed').attr('aria-hidden', 'true');
            } else {
                window.localStorage.removeItem(donationBannerStorageKey);
            }
        } catch (error) {
            // Keep the banner visible when storage is unavailable.
        }
    }

    $('[data-amount-usd]').off('.donation').on('click.donation', function() {
        selectDonationAmount(this);
        applyDonationUsdAmount($(this).data('amount-usd'));
    });

    $('#donation-input-amount-usd').off('.donation').on('input.donation', function() {
        clearDonationSelectedAmount();

        var amountBtc = donationUsdToBtc($(this).val());
        $('#donation-input-amount-btc').val(amountBtc);

        if (amountBtc !== '') {
            setDonationRateStatus('', false);
        } else if (parseDonationAmount($(this).val()) !== null) {
            setDonationRateStatus(
                modal.data(donationTickerRequest ? 'rate-loading' : 'rate-unavailable'),
                !donationTickerRequest
            );
        } else {
            setDonationRateStatus('', false);
        }

        generateDonationQrCode();
    });

    $('#donation-input-amount-btc').off('.donation').on('input.donation', function() {
        clearDonationSelectedAmount();

        var amountUsd = donationBtcToUsd($(this).val());
        $('#donation-input-amount-usd').val(amountUsd);
        setDonationRateStatus('', false);
        generateDonationQrCode();
    });

    $('#donation-input-message').off('.donation').on('input.donation', generateDonationQrCode);

    var selectedAmount = $('[data-amount-usd][aria-pressed="true"]').first();
    if (selectedAmount.length) {
        $('#donation-input-amount-usd').val(selectedAmount.data('amount-usd'));
    }

    generateDonationQrCode();
}

function toggleDonationBanner() {
    openDonationModal();
}

function closeDonationBanner() {
    dismissDonationBanner();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonationUI);
} else {
    setTimeout(initDonationUI, 0);
}
function accordion() {
  $(document).ready(function($) {
    $('.accordion-toggle').click(function(){

      //Expand or collapse this panel
      $(this).next().slideToggle('fast');
      $(this).toggleClass("active");

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp("fast");
      $(".accordion-toggle").not($(this)).removeClass("active");
    });
  });
}

function onScrollButton() {
  var button = document.querySelector(".mob-sidebar-open");
  var buttonTop = button.offsetTop;
  var buttonHeight = button.offsetHeight;
  var sidebar = document.querySelector(".sidebar");
  var closeButton = document.querySelector(".mob-sidebar-close");
  var sidebarLinks = document.querySelectorAll(".sidebar-inner ul li");

  function stickyButton() {
    if (document.documentElement.clientWidth <= 640) {
      if (buttonTop === 0) {
        buttonTop = button.offsetTop;
      }
      var footerTop = document.querySelector(".footer").offsetTop;

      // Fixed menu
      if (window.scrollY >= buttonTop && window.scrollY + buttonHeight <= footerTop) {
        button.classList.add("is-fixed");
        document.body.style.paddingTop = buttonHeight + 25 + "px";
      } else {
        button.classList.remove("is-fixed");
        document.body.style.paddingTop = "";
      }
    }
  }

  function showSidebar() {
    sidebar.classList.add("is-open");
    button.classList.add("hide");
  }

  function hideSidebar() {
    sidebar.classList.remove("is-open");
    button.classList.remove("hide");
  }

  window.addEventListener("scroll", stickyButton);
  button.addEventListener("click", showSidebar);
  closeButton.addEventListener("click", hideSidebar);

  for (var i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener("click", function(event) {
      if (document.documentElement.clientWidth <= 640) {
        closeButton.click();
      }
    });
  }
}

function handleDevDocsRedirect(name) {
  var blockchainGuideRedirects = ["proof-of-work", "block-height-and-forking", "transaction-data", "consensus-rule-changes", "detecting-forks", "term-consensus", "term-consensus-rules", "term-block", "term-merkle-root", "term-txid", "term-utxo", "term-transaction-fee", "term-miner", "term-proof-of-work", "term-target", "term-difficulty", "term-51-attack", "term-block-height", "term-genesis-block", "term-fork", "term-stale-block", "term-merkle-tree", "term-hard-fork", "term-soft-fork", "term-uasf", "term-masf"];
  var transactionGuideRedirects = ["p2pkh-script-validation", "p2sh-scripts", "standard-transactions", "signature-hash-types", "locktime-and-sequence-number", "transaction-fees-and-change", "avoiding-key-reuse", "transaction-malleability", "term-key-pair", "term-output-index", "term-transaction-version-number", "term-unique-address", "term-input", "term-output", "term-p2pkh", "term-private-key", "term-public-key", "term-address", "term-pubkey-script", "term-signature-script", "term-signature", "term-p2sh", "term-redeem-script", "term-null-data", "term-signature-hash", "term-sighash-all", "term-sighash-none", "term-sighash-single", "term-sighash-anyonecanpay", "term-locktime", "term-sequence-number", "term-high-priority-transactions", "term-minimum-fee", "term-change-output", "term-transaction-malleability"];
  var contractsGuideRedirects = ["escrow-and-arbitration", "micropayment-channel", "coinjoin", "term-escrow-contract", "term-multisig", "term-p2sh-multisig", "term-micropayment-channel"];
  var walletsGuideRedirects = ["wallet-programs", "full-service-wallets", "signing-only-wallets", "offline-wallets", "hardware-wallets", "distributing-only-wallets", "wallet-files", "private-key-formats", "wallet-import-format-wif", "mini-private-key-format", "public-key-formats", "hierarchical-deterministic-key-creation", "hardened-keys", "storing-root-seeds", "loose-key-wallets", "term-key-index", "term-point-function", "term-wallet-import-format", "term-hd-protocol", "term-child-public-key", "term-parent-public-key", "term-child-key", "term-parent-key", "term-chain-code", "term-master-chain-code", "term-parent-private-key", "term-parent-chain-code", "term-extended-key", "term-extended-private-key", "term-extended-public-key", "term-master-private-key", "term-root-seed", "term-hardened-extended-private-key"];
  var paymentProcessingGuideRedirects = ["pricing-orders", "requesting-payments", "plain-text", "bitcoin-uri", "qr-codes", "payment-protocol", "verifying-payment", "issuing-refunds", "disbursing-income-limiting-forex-risk", "merge-avoidance", "last-in-first-out-lifo", "first-in-first-out-fifo", "rebilling-recurring-payments", "term-bitcoin-uri", "term-fiat", "term-label", "term-merge", "term-merge-avoidance", "term-message", "term-r-parameter", "term-receipt", "term-uri-qr-code", "term-payment-protocol", "term-double-spend", "term-confirmation"];
  var operatingModesGuideRedirects = ["full-node", "simplified-payment-verification-spv", "potential-spv-weaknesses", "bloom-filters", "application-of-bloom-filters", "future-proposals"];
  var p2pNetworkOpertingGuideRedirects = ["peer-discovery", "connecting-to-peers", "initial-block-download", "blocks-first", "headers-first", "block-broadcasting", "orphan-blocks", "transaction-broadcasting", "memory-pool", "misbehaving-nodes", "alerts", "term-network", "term-standard-block-relay", "term-unsolicited-block-push", "term-dns-seed", "term-header-chain", "term-direct-headers-announcement"];
  var miningGuideRedirects = ["solo-mining", "pool-mining", "block-prototypes", "getwork-rpc", "getblocktemplate-rpc", "stratum"];

  if (blockchainGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/blockchain-guide#" + name;
  }

  if (transactionGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/transactions-guide#" + name;
  }

  if (contractsGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/contracts-guide#" + name;
  }

  if (walletsGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/wallets-guide#" + name;
  }

  if (paymentProcessingGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/payment-processing-guide#" + name;
  }

  if (operatingModesGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/operating-modes-guide#" + name;
  }

  if (p2pNetworkOpertingGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/p2p-network-guide#" + name;
  }

  if (miningGuideRedirects.indexOf(name) > -1) {
    window.location.href = "/en/mining-guide#" + name;
  }

}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function updateQueryStringParameter(key, value) {
  var uri = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function checkIfFiltersInclude(categories, filters) {
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    if (categories.indexOf(filter) === -1 && filter !== '') return false;
  }
  return true;
}

function setUrlParameter(parameter, value) {
  history.pushState(null, null, updateQueryStringParameter(parameter, value));
}

function queryStringToArray() {            
  var categories = ['platform', 'user', 'important', 'features'];
  var result = [];
  var pairs = location.search.slice(1).split('&');

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    pair = pair.split('=');
    if (pair[1] && categories.indexOf(pair[0]) > -1) result = result.concat(pair[1].split(','));
  }

  return result;
}

function changeAccordionButtonText(button, text) {
  button.textContent = text;
}

var moonPaySignerBaseUrl = 'https://moonpay.bitcoin.org';
var moonPayApiKey = 'pk_live_QWvwDl3WJAq7S8fDjsOUMfjn09DSw8R';
var moonPayEnvironment;

if (moonPayApiKey.indexOf('pk_test_') === 0) {
  moonPayEnvironment = 'sandbox';
} else if (moonPayApiKey.indexOf('pk_live_') === 0) {
  moonPayEnvironment = 'production';
} else {
  throw new Error(
    'MoonPay API key must begin with pk_test_ or pk_live_.'
  );
}

function getMoonPaySignerUrl(path) {
  return moonPaySignerBaseUrl.replace(/\/$/, '') + path;
}

function getMoonPaySignerError(jqXHR, fallbackMessage) {
  var payload = jqXHR.responseJSON;

  if (!payload && jqXHR.responseText) {
    try {
      payload = JSON.parse(jqXHR.responseText);
    } catch (e) {
      payload = null;
    }
  }

  var message = fallbackMessage;
  var code = 'signer_request_failed';

  if (payload && payload.error) {
    if (payload.error.message) {
      message = payload.error.message;
    }

    if (payload.error.code) {
      code = payload.error.code;
    }
  }

  var error = new Error(message);

  error.code = code;
  error.status = jqXHR.status;

  return error;
}

function requestMoonPayAllowedIpAddress() {
  return $.ajax({
    url: getMoonPaySignerUrl('/v1/moonpay/ip-hash'),
    type: 'POST',
    dataType: 'json',
    cache: false,
    crossDomain: true
  });
}

function requestMoonPaySignature(urlForSignature) {
  return $.ajax({
    url: getMoonPaySignerUrl('/v1/moonpay/signature'),
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    processData: false,
    cache: false,
    crossDomain: true,
    data: JSON.stringify({
      urlForSignature: urlForSignature
    })
  });
}

function initializeSignedMoonPayWidget(flow, containerSelector) {
  var deferred = $.Deferred();

  if (!window.MoonPayWebSdk ||
      typeof window.MoonPayWebSdk.init !== 'function') {
    deferred.reject(
      new Error('MoonPay Web SDK is not loaded.')
    );

    return deferred.promise();
  }

  if ($(containerSelector).length === 0) {
    deferred.reject(
      new Error(
        'MoonPay widget container was not found: ' +
        containerSelector
      )
    );

    return deferred.promise();
  }

  requestMoonPayAllowedIpAddress()
    .done(function(ipResponse) {
      if (!ipResponse ||
          typeof ipResponse.allowedIpAddress !== 'string' ||
          ipResponse.allowedIpAddress === '') {
        deferred.reject(
          new Error(
            'The MoonPay signer returned an invalid IP hash.'
          )
        );

        return;
      }

      var widget;

      try {
        widget = window.MoonPayWebSdk.init({
          flow: flow,
          environment: moonPayEnvironment,
          containerNodeSelector: containerSelector,
          variant: 'embedded',
          params: {
            apiKey: moonPayApiKey,
            theme: 'light',
            colorCode: '#FF9500',
            allowedIpAddress: ipResponse.allowedIpAddress
          }
        });

        if (!widget ||
            typeof widget.generateUrlForSigning !== 'function' ||
            typeof widget.updateSignature !== 'function' ||
            typeof widget.show !== 'function') {
          throw new Error(
            'The MoonPay Web SDK returned an unsupported ' +
            flow +
            ' widget.'
          );
        }
      } catch (error) {
        deferred.reject(error);
        return;
      }

      var urlForSignature;

      try {
        urlForSignature = widget.generateUrlForSigning();
      } catch (error) {
        deferred.reject(error);
        return;
      }

      requestMoonPaySignature(urlForSignature)
        .done(function(signatureResponse) {
          if (!signatureResponse ||
              typeof signatureResponse.signature !== 'string' ||
              signatureResponse.signature === '') {
            deferred.reject(
              new Error(
                'The MoonPay signer returned an invalid signature.'
              )
            );

            return;
          }

          try {
            widget.updateSignature(
              signatureResponse.signature
            );

            deferred.resolve(widget);
          } catch (error) {
            deferred.reject(error);
          }
        })
        .fail(function(jqXHR) {
          deferred.reject(
            getMoonPaySignerError(
              jqXHR,
              'Unable to sign the MoonPay ' +
              flow +
              ' widget URL.'
            )
          );
        });
    })
    .fail(function(jqXHR) {
      deferred.reject(
        getMoonPaySignerError(
          jqXHR,
          'Unable to bind the MoonPay ' +
          flow +
          ' widget to the client IP address.'
        )
      );
    });

  return deferred.promise();
}

function showMoonPayWidget(flow, containerSelector, retry) {
  if (retry === undefined) {
    retry = false;
  }

  initializeSignedMoonPayWidget(
    flow,
    containerSelector
  )
    .done(function(widget) {
      widget.show();
    })
    .fail(function(error) {
      /*
       * Repeat the complete IP-hash and signing sequence once
       * if the visitor's public IP changes between requests.
       */
      if (!retry && error.code === 'client_ip_changed') {
        showMoonPayWidget(
          flow,
          containerSelector,
          true
        );

        return;
      }

      console.error(
        'Unable to display the MoonPay ' +
        flow +
        ' widget:',
        error
      );
    });
}

function showBuyWidget() {
  showMoonPayWidget(
    'buy',
    '.buy-widget'
  );
}

function showSellWidget() {
  showMoonPayWidget(
    'sell',
    '.sell-widget'
  );
}

function handlePageRedirect(isBuyPage, isSellPage) {
    if (isBuyPage === undefined) {
        isBuyPage = false;
    }
    if (isSellPage === undefined) {
        isSellPage = false;
    }

    $.get('/cdn-cgi/trace')
        .done(function(response) {
            var data = {};
            var lines = response.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var parts = line.split('=');
                if (parts.length === 2) {
                    var key = parts[0];
                    var value = decodeURIComponent(parts[1] || '');
                    data[key] = value;
                }
            }

            if (isBuyPage) {
                if (data.loc === 'GB') {
                    window.location.href = '/';
                } else {
                    showBuyWidget();
                }
            } else if (isSellPage) {
                if (data.loc === 'GB') {
                    window.location.href = '/';
                } else {
                    showSellWidget();
                }
            } else {
                if (data.loc === 'GB') {
                    $('#buybitcoinbutton').hide();
                    $('#buybitcoinmenulink').hide();
                    $('#buybitcoinfootermenulink').hide();
                    $('#getstartedbuybutton').hide();
                    $('#sellbitcoinmenulink').hide();
                    $('#sellbitcoinfootermenulink').hide();
                }
            }
        });
}

function sortTableColumn(selectedOption) {
  var tableAccordion = document.getElementById('tableAccordion');
  var tableAccordionButton = document.getElementById('tableAccordionButton');
  
  changeAccordionButtonText(tableAccordionButton, selectedOption);
  tableAccordion.classList.remove('open');

  var tableCells = document.querySelectorAll('.wallet-table-data[data-cell]');

  for (var i = 0; i < tableCells.length; i++) {
    var cell = tableCells[i];
    if (cell.dataset.cell === selectedOption) {
      cell.classList.remove('hidden');
    } else cell.classList.add('hidden');
  }
}

/* jshint ignore:start */
window.addEventListener('wheel', (event) => {
  let cat = document.querySelector('.herecomesbitcoin-cat');

  const screenBottom = window.innerHeight;
  const scrollBottom = window.scrollY + window.innerHeight;
  if (scrollBottom + screenBottom >= document.body.offsetHeight && event.deltaY > 200) {
    setTimeout(() => {
      cat.classList.add('show');
    }, 1000);
  }
})
/* jshint ignore:end */
