(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(document) {
    var VideoLightning, _bitify, _boolify, _cc, _coverEl, _domStr, _extObj, _fadeCss, _fadeIn, _fadeOut, _frameCss, _fullHex, _getEl, _gravity, _initYTAPI, _isAry, _isElAry, _isObj, _isStr, _postToVM, _prepHex, _randar, _setSrc, _testEl, _topKeyOfObj, _val, _wrapCss, _wrapCssP, _ytReset, dom, videoLightning;
    dom = document;
    videoLightning = (function(_this) {
      return function(obj) {
        var de, domEls, e, el, els, i, j, l, len, len1, len2, len3, m, noElErr, optEls, pushRawEls, rawEls, settings;
        noElErr = function() {
          console.error('VideoLightning was initialized without elements.');
        };
        optEls = obj.elements || obj.element;
        if (!optEls) {
          return noElErr();
        }
        rawEls = [];
        els = [];
        pushRawEls = function(e) {
          var el;
          if (_isStr(e)) {
            return rawEls.push({
              el: e,
              opts: null
            });
          } else {
            el = _topKeyOfObj(e);
            return rawEls.push({
              el: el,
              opts: e[el] || null
            });
          }
        };
        if (_isAry(optEls)) {
          for (i = 0, len = optEls.length; i < len; i++) {
            e = optEls[i];
            pushRawEls(e);
          }
        } else {
          pushRawEls(optEls);
        }
        for (j = 0, len1 = rawEls.length; j < len1; j++) {
          el = rawEls[j];
          if ((domEls = _getEl(el.el))) {
            if (_isElAry(domEls)) {
              for (l = 0, len2 = domEls.length; l < len2; l++) {
                de = domEls[l];
                els.push({
                  el: de,
                  opts: el.opts
                });
              }
            } else {
              els.push({
                el: domEls,
                opts: el.opts
              });
            }
          }
        }
        if (els.length === 0) {
          return noElErr();
        }
        settings = obj.settings || {};
        for (m = 0, len3 = els.length; m < len3; m++) {
          el = els[m];
          if (el) {
            _this.vlData.instances.push(new VideoLightning(el, settings));
          }
        }
        _initYTAPI();
      };
    })(this);
    VideoLightning = (function() {
      function VideoLightning(elObj, opts) {
        this.elObj = elObj;
        this.vmStop = bind(this.vmStop, this);
        this.vmPlay = bind(this.vmPlay, this);
        this.vmListen = bind(this.vmListen, this);
        this.initPlayerVM = bind(this.initPlayerVM, this);
        this.coverYT = bind(this.coverYT, this);
        this.ytState = bind(this.ytState, this);
        this.ytStop = bind(this.ytStop, this);
        this.ytPlay = bind(this.ytPlay, this);
        this.setYTPlayer = bind(this.setYTPlayer, this);
        this.initPlayerYT = bind(this.initPlayerYT, this);
        this.cover = bind(this.cover, this);
        this.hide = bind(this.hide, this);
        this.show = bind(this.show, this);
        this.clear = bind(this.clear, this);
        this.stop = bind(this.stop, this);
        this.play = bind(this.play, this);
        this.peek = bind(this.peek, this);
        this.hovered = bind(this.hovered, this);
        this.clicked = bind(this.clicked, this);
        this.regEvents = bind(this.regEvents, this);
        this.resize = bind(this.resize, this);
        this.popoverPos = bind(this.popoverPos, this);
        this.buildEls = bind(this.buildEls, this);
        this.buildOpts = bind(this.buildOpts, this);
        this.opts = _extObj({}, opts);
        this.inst = _randar();
        this.el = this.elObj.el;
        this.buildOpts();
        this.buildEls();
        if (_boolify(this.opts.cover, false)) {
          this.cover();
        }
        this.regEvents();
      }

      VideoLightning.prototype.buildOpts = function() {
        var base, base1, elDataSet, i, j, k, key, len, len1, name, normalize, ref, remap, results, v;
        remap = [['backdrop_color', 'bdColor'], ['backdrop_opacity', 'bdOpacity'], ['ease_in', 'fadeIn'], ['ease_out', 'fadeOut'], ['glow_color', 'glowColor'], ['start_time', 'startTime'], ['z_index', 'zIndex'], ['rick_roll', 'rickRoll'], ['iv_load_policy', 'ivLoadPolicy']];
        _extObj(this.opts, this.elObj.opts);
        elDataSet = this.el.dataset || [];
        if (elDataSet.length === 0) {
          ref = ['id', 'width', 'height'];
          for (i = 0, len = ref.length; i < len; i++) {
            k = ref[i];
            v = this.el.getAttribute("data-video-" + k);
            if (v) {
              elDataSet[k] = v;
            }
          }
        }
        normalize = (function(_this) {
          return function(k, v) {
            return _this.opts[k.replace(/^video(.)(.*)/, function(a, b, c) {
              return b.toLowerCase() + c;
            })] = v;
          };
        })(this);
        for (k in elDataSet) {
          v = elDataSet[k];
          normalize(k, v);
        }
        this.opts.width = this.opts.width ? parseInt(this.opts.width, 10) : 640;
        this.opts.height = this.opts.height ? parseInt(this.opts.height, 10) : 390;
        if ((base = this.opts).id == null) {
          base.id = 'y-dQw4w9WgXcQ';
        }
        if (this.opts.id.match(/^v/)) {
          this.vendor = 'vimeo';
          this.vm = true;
        } else if (this.opts.id.match(/^f/)) {
          this.vendor = 'iframe';
          this.ifr = true;
        } else {
          this.vendor = 'youtube';
          this.yt = true;
        }
        window.vlData[this.vendor] = true;
        this.id = this.opts.id.replace(/([vyf]-)/i, '');
        results = [];
        for (j = 0, len1 = remap.length; j < len1; j++) {
          key = remap[j];
          results.push((base1 = this.opts)[name = key[1]] != null ? base1[name] : base1[name] = this.opts[key[0]]);
        }
        return results;
      };

      VideoLightning.prototype.buildEls = function() {
        var bdbg, bdc, bdo, fdim, fglo, fmar, frameCss, g, wrapCss, xCss;
        (this.target = dom.createElement('span')).className = 'video-target';
        this.el.parentNode.insertBefore(this.target, this.el);
        this.target.appendChild(this.el);
        bdc = _cc(_val(this.opts.bdColor, '#ddd'));
        bdo = _val(this.opts.bdOpacity, 0.6);
        bdbg = "background: rgba(" + bdc.r + ", " + bdc.g + ", " + bdc.b + ", " + bdo + ");";
        fdim = "width: " + this.opts.width + "px; height: " + this.opts.height + "px;";
        fmar = "margin-top: -" + (this.opts.height / 2) + "px; margin-left: -" + (this.opts.width / 2) + "px;";
        fglo = "box-shadow: 0px 0px " + (g = _val(this.opts.glow, 20)) + "px " + (g / 5) + "px " + (_fullHex(_val(this.opts.glowColor, '#000'))) + ";";
        wrapCss = _boolify(this.opts.popover, false) ? _wrapCssP(this.opts.width, this.opts.height) : _wrapCss;
        xCss = "background: " + (_fullHex(_val(this.opts.xBgColor, '#000'))) + "; color: " + (_fullHex(_val(this.opts.xColor, '#fff'))) + "; border: " + (_val(this.opts.xBorder, 'none')) + "; box-sizing: border-box;";
        frameCss = "background: " + (_fullHex(_val(this.opts.frameColor, '#000'))) + "; border: " + (_val(this.opts.frameBorder, 'none')) + "; box-sizing: border-box;";
        this.target.insertAdjacentHTML('beforeend', _domStr({
          tag: 'div',
          attrs: {
            id: "wrap_" + this.inst,
            "class": 'video-wrapper',
            style: wrapCss + " " + bdbg + " z-index: " + (_val(this.opts.zIndex, 2100)) + "; opacity: 0;"
          },
          children: [
            {
              tag: 'div',
              attrs: {
                "class": 'video-frame',
                style: _frameCss + " " + fdim + " " + fmar + " " + fglo
              },
              children: [
                {
                  tag: 'div',
                  attrs: {
                    "class": 'video'
                  },
                  children: [
                    {
                      tag: 'div',
                      inner: '&times;',
                      attrs: {
                        id: "close_" + this.inst,
                        "class": 'video-close',
                        style: "float: right; margin-right: -34px; " + fglo + " " + xCss + " padding: 0 10px 0 12px; font-size: 25px;"
                      }
                    }, {
                      tag: 'iframe',
                      attrs: {
                        type: 'text/html',
                        id: "iframe_" + this.inst,
                        "class": 'video-iframe',
                        style: "position: absolute; top: 0; left: 0; " + frameCss
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }));
        this.wrapper = dom.getElementById("wrap_" + this.inst);
        this.iframe = dom.getElementById("iframe_" + this.inst);
        return this.close = dom.getElementById("close_" + this.inst);
      };

      VideoLightning.prototype.popoverPos = function() {
        var pos;
        pos = _gravity(this.target, this.opts.width, this.opts.height, this.opts.fluidity);
        this.wrapper.style.left = pos.x + "px";
        return this.wrapper.style.top = pos.y + "px";
      };

      VideoLightning.prototype.resize = function() {
        var throttleOff;
        if (!window.vlData.throttle) {
          this.popoverPos();
          if (this.opts.throttle) {
            window.vlData.throttle = true;
            throttleOff = function() {
              return window.vlData.throttle = false;
            };
            return setTimeout(throttleOff, this.opts.throttle);
          }
        }
      };

      VideoLightning.prototype.regEvents = function() {
        this.target.style.cursor = 'pointer';
        this.target.addEventListener('mouseup', this.clicked, false);
        if (_boolify(this.opts.popover, false)) {
          window.addEventListener('resize', this.resize, false);
          window.addEventListener('scroll', this.resize, false);
          window.addEventListener('orientationchange', this.resize, false);
          if (this.opts.peek) {
            this.target.addEventListener('mouseenter', this.hovered, false);
            return this.target.addEventListener('mouseleave', this.hovered, false);
          }
        }
      };

      VideoLightning.prototype.clicked = function(e) {
        if (this.peeking) {
          return this.peek(false, true);
        }
        if ((e.buttons && e.buttons !== 1) || (e.which && e.which !== 1) || (e.button && e.button !== 1)) {
          return;
        }
        if (this.playing) {
          return this.stop();
        } else {
          return this.play();
        }
      };

      VideoLightning.prototype.hovered = function(e) {
        if (e.type === 'mouseenter' && !this.playing) {
          this.peek();
        }
        if (e.type === 'mouseleave' && this.playing) {
          return this.peek(this.peeking);
        }
      };

      VideoLightning.prototype.peek = function(close, pin) {
        if (close == null) {
          close = false;
        }
        if (pin == null) {
          pin = false;
        }
        if (!this.peeking && this.playing) {
          return;
        }
        this.close.innerHTML = close || pin ? '&times;' : '&#94;';
        this.peeking = !!!(close || pin);
        if (close) {
          return this.stop();
        } else if (pin) {
          return null;
        } else {
          return this.play();
        }
      };

      VideoLightning.prototype.play = function() {
        if (_boolify(this.opts.popover, false)) {
          this.popoverPos();
        }
        this.show();
        if (this.ifr) {
          _setSrc(this.iframe, {
            url: encodeURI(this.id),
            attrs: {
              width: this.opts.width,
              height: this.opts.height,
              frameBorder: 0
            }
          });
        } else if (this.ready && !this.playing && this.iframe.src !== 'about:blank') {
          if (this.yt) {
            this.ytPlay();
          }
          if (this.vm) {
            this.vmPlay();
          }
        } else if (!this.playing) {
          if (this.vm) {
            this.initPlayerVM();
          }
          if (this.yt) {
            this.initPlayerYT();
          }
        }
        this.playing = true;
        if (this.clearAfter) {
          window.clearTimeout(this.clearAfter);
        }
      };

      VideoLightning.prototype.stop = function(fade) {
        if (fade == null) {
          fade = 0;
        }
        if (_boolify(this.opts.rickRoll, false)) {
          return;
        }
        this.hide(fade);
        if (this.ready) {
          if (this.yt) {
            this.ytStop();
          }
          if (this.vm) {
            this.vmStop();
          }
        } else {
          this.clear();
        }
        this.playing = false;
        if (_boolify(this.opts.unload, true)) {
          this.clearAfter = window.setTimeout(this.clear, (_val(this.opts.unloadAfter) || 45) * 1000);
        }
      };

      VideoLightning.prototype.clear = function() {
        this.iframe.src = 'about:blank';
      };

      VideoLightning.prototype.show = function() {
        _fadeIn(this.wrapper, _val(this.opts.fadeIn, 300));
      };

      VideoLightning.prototype.hide = function(fade) {
        if (fade == null) {
          fade = 0;
        }
        _fadeOut(this.wrapper, _val(this.opts.fadeOut, fade));
      };

      VideoLightning.prototype.cover = function() {
        if (this.yt) {
          this.coverYT();
        }
      };

      VideoLightning.prototype.initPlayerYT = function() {
        _setSrc(this.iframe, {
          url: location.protocol + "//www.youtube.com/embed/" + this.id,
          params: {
            enablejsapi: 1,
            autoplay: _bitify(this.opts.autoplay, 1),
            autohide: _val(this.opts.autohide, 2),
            cc_load_policy: _val(this.opts.ccLoadPolicy, 0),
            color: _val(this.opts.color, null),
            controls: _val(this.opts.controls, 2),
            disablekb: _val(this.opts.disablekb, 0),
            end: _val(this.opts.endTime, null),
            fs: _val(this.opts.fs, 1),
            hl: _val(this.opts.hl, 'en'),
            iv_load_policy: _val(this.opts.ivLoadPolicy, 1),
            list: _val(this.opts.list, null),
            listType: _val(this.opts.listType, null),
            loop: _val(this.opts.loop, 0),
            modestbranding: _val(this.opts.modestbranding, 0),
            origin: encodeURIComponent(_val(this.opts.origin, location.protocol + "//" + location.host)),
            playerapiid: this.inst,
            playlist: _val(this.opts.playlist, null),
            playsinline: _val(this.opts.playsinline, 0),
            rel: _val(this.opts.rel, 0),
            showinfo: _val(this.opts.showinfo, 1),
            start: _val(this.opts.startTime, 0),
            theme: _val(this.opts.theme, null)
          },
          attrs: {
            width: this.opts.width,
            height: this.opts.height,
            frameBorder: 0
          }
        });
        this.iframe.setAttribute('allowFullScreen', '');
        if (window.vlData.ytAPIReady) {
          return this.setYTPlayer();
        }
      };

      VideoLightning.prototype.setYTPlayer = function() {
        var ready;
        ready = (function(_this) {
          return function() {
            return _this.ready = true;
          };
        })(this);
        return this.ytPlayer != null ? this.ytPlayer : this.ytPlayer = new YT.Player("iframe_" + this.inst, {
          events: {
            onReady: ready,
            onStateChange: this.ytState
          }
        });
      };

      VideoLightning.prototype.ytPlay = function() {
        return this.ytPlayer.playVideo();
      };

      VideoLightning.prototype.ytStop = function() {
        _ytReset(this.ytPlayer, this.opts.startTime);
        this.ytPlayer.stopVideo();
        return this.ytPlayer.clearVideo();
      };

      VideoLightning.prototype.ytState = function(e) {
        if (e.data === 0 && _boolify(this.opts.autoclose, true)) {
          return this.stop(_val(this.opts.fadeOut, 1000));
        }
      };

      VideoLightning.prototype.coverYT = function() {
        this.ytCover = _coverEl(this.target, "//img.youtube.com/vi/" + this.id + "/hqdefault.jpg");
      };

      VideoLightning.prototype.initPlayerVM = function() {
        _setSrc(this.iframe, {
          url: location.protocol + "//player.vimeo.com/video/" + this.id,
          params: {
            autoplay: _bitify(this.opts.autoplay, 1),
            loop: _val(this.opts.loop, 0),
            title: _val(this.opts.showinfo, 1),
            byline: _val(this.opts.byline, 1),
            portrait: _val(this.opts.portrait, 1),
            color: _prepHex(_val(this.opts.color, '#00adef')),
            api: 1,
            player_id: this.inst
          },
          attrs: {
            width: this.opts.width,
            height: this.opts.height,
            frameBorder: 0
          }
        });
        this.iframe.setAttribute('allowFullScreen', '');
        window.addEventListener('message', this.vmListen, false);
        return this.vmPlayer != null ? this.vmPlayer : this.vmPlayer = this.iframe;
      };

      VideoLightning.prototype.vmListen = function(msg) {
        var data;
        data = JSON.parse(msg.data);
        if (data.player_id !== this.inst) {
          return;
        }
        switch (data.event) {
          case 'ready':
            this.ready = true;
            _postToVM(this.vmPlayer, this.id, 'addEventListener', 'finish');
            break;
          case 'finish':
            this.stop(1000);
        }
      };

      VideoLightning.prototype.vmPlay = function() {
        _postToVM(this.vmPlayer, this.id, 'play');
      };

      VideoLightning.prototype.vmStop = function() {
        _postToVM(this.vmPlayer, this.id, 'pause');
      };

      return VideoLightning;

    })();
    _val = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return p;
      } else {
        return p || d;
      }
    };
    _bitify = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return 0;
      } else if (p === true || p === 'true' || p === '1' || p === 1) {
        return 1;
      } else {
        return d;
      }
    };
    _boolify = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return false;
      } else {
        return !!p || d;
      }
    };
    _domStr = function(o) {
      var attrs, c, children, i, k, len, ref, ref1, v;
      attrs = '';
      children = '';
      if (o.attrs) {
        ref = o.attrs;
        for (k in ref) {
          v = ref[k];
          attrs += ' ' + k + '="' + v + '"';
        }
      }
      if (o.children) {
        ref1 = o.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          c = ref1[i];
          children += _isObj(c) ? _domStr(c) : c;
        }
      }
      return '<' + o.tag + attrs + '>' + (o.inner || children) + '</' + o.tag + '>';
    };
    _setSrc = function(el, o) {
      var k, ref, ref1, results, src, v;
      src = o.url + "?";
      ref = o.params;
      for (k in ref) {
        v = ref[k];
        if (v !== null) {
          src += "&" + k + "=" + v;
        }
      }
      el.src = src.replace(/&/, '');
      ref1 = o.attrs;
      results = [];
      for (k in ref1) {
        v = ref1[k];
        results.push(el[k] = v);
      }
      return results;
    };
    _extObj = function(baseObj, extObj) {
      var k, v;
      for (k in extObj) {
        v = extObj[k];
        baseObj[k] = v;
      }
      return baseObj;
    };
    _isStr = function(obj) {
      return typeof obj === 'string';
    };
    _isAry = function(obj) {
      return obj instanceof Array;
    };
    _isElAry = function(obj) {
      return obj instanceof HTMLCollection || obj instanceof NodeList;
    };
    _isObj = function(obj) {
      return obj !== null && typeof obj === 'object';
    };
    _topKeyOfObj = function(obj) {
      var k, v;
      for (k in obj) {
        v = obj[k];
        return k;
      }
    };
    _getEl = function(el) {
      var els;
      els = el.charAt(0) === '#' ? dom.getElementById(el.substr(1)) : dom.getElementsByClassName(el.substr(1));
      if (_isAry(els) && els.length === 0) {
        return null;
      } else {
        return els;
      }
    };
    _randar = function() {
      return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0, 16);
    };
    _prepHex = function(hex) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        return "" + hex + hex;
      } else {
        return hex;
      }
    };
    _fullHex = function(hex) {
      if (hex === 'transparent') {
        return hex;
      } else {
        return "#" + _prepHex(hex);
      }
    };
    _cc = function(hex) {
      return {
        r: parseInt((_prepHex(hex)).substring(0, 2), 16),
        g: parseInt((_prepHex(hex)).substring(2, 4), 16),
        b: parseInt((_prepHex(hex)).substring(4, 6), 16)
      };
    };
    _wrapCss = 'display: none; position: fixed; min-width: 100%; min-height: 100%; top: 0; right: 0; bottom: 0; left: 0;';
    _wrapCssP = function(w, h) {
      return "display: none; position: fixed; width: " + w + "px; height: " + h + "px;";
    };
    _frameCss = 'position: absolute; top: 50%; left: 50%; background: #000000;';
    _fadeCss = function(el, t) {
      return el.style.transition = el.style.mozTransition = el.style.webkitTransition = "opacity " + t + "ms ease";
    };
    _fadeIn = function(el, t) {
      var applyFade;
      _fadeCss(el, t);
      el.style.display = 'block';
      applyFade = function() {
        return el.style.opacity = 1;
      };
      return setTimeout(applyFade, 20);
    };
    _fadeOut = function(el, t) {
      var applyFade;
      _fadeCss(el, t);
      el.style.opacity = 0;
      applyFade = function() {
        return el.style.display = 'none';
      };
      return setTimeout(applyFade, t);
    };
    _initYTAPI = function() {
      var scriptA, vFuncs, vScript;
      if (dom.getElementById('ytScript')) {
        return;
      }
      scriptA = dom.getElementsByTagName('script')[0];
      vFuncs = document.createElement('script');
      vFuncs.innerHTML = 'function onYouTubeIframeAPIReady() {vlData.ytReady()};';
      scriptA.parentNode.insertBefore(vFuncs, scriptA);
      vScript = document.createElement('script');
      vScript.id = 'ytScript';
      vScript.async = true;
      vScript.src = location.protocol + "//www.youtube.com/iframe_api";
      vFuncs.parentNode.insertBefore(vScript, vFuncs.nextSibling);
    };
    _ytReset = function(p, s) {
      if (s == null) {
        s = 0;
      }
      if ((p.getDuration() - 3) < p.getCurrentTime()) {
        p.pauseVideo();
        p.seekTo(s, false);
      }
    };
    _postToVM = function(player, id, k, v) {
      var data;
      if (v == null) {
        v = null;
      }
      data = v ? {
        method: k,
        value: v
      } : {
        method: k
      };
      return player.contentWindow.postMessage(JSON.stringify(data), location.protocol + "//player.vimeo.com/video/" + id);
    };
    _coverEl = function(target, src) {
      var cover;
      cover = dom.createElement('img');
      cover.className = 'video-cover';
      cover.src = src;
      target.appendChild(cover);
      return cover;
    };
    _testEl = function() {
      var test;
      if (!(test = document.getElementById('vl-size-test'))) {
        test = document.createElement("div");
        test.id = 'vl-size-test';
        test.style.cssText = "position:fixed;top:0;left:0;bottom:0;right:0;visibility:hidden;";
        document.body.appendChild(test);
      }
      return {
        width: test.offsetWidth,
        height: test.offsetHeight
      };
    };
    _gravity = function(el, width, height, fluidity) {
      var box_center, center, coords, i, j, page_height, page_width, points, ref, ref1, ref2, ref3, ref4, ref5, sort, x, y;
      if (fluidity == null) {
        fluidity = 30;
      }
      coords = el.getBoundingClientRect();
      center = {
        x: (page_width = _testEl().width) / 2,
        y: (page_height = _testEl().height) / 2
      };
      box_center = {
        x: width / 2,
        y: height / 2
      };
      points = [];
      for (x = i = ref = coords.left, ref1 = coords.right + width, ref2 = fluidity; ref2 > 0 ? i <= ref1 : i >= ref1; x = i += ref2) {
        points.push([x - width, coords.top - height]);
        points.push([x - width, coords.bottom]);
      }
      for (y = j = ref3 = coords.top, ref4 = coords.bottom + height, ref5 = fluidity; ref5 > 0 ? j <= ref4 : j >= ref4; y = j += ref5) {
        points.push([coords.left - width, y - height]);
        points.push([coords.right, y - height]);
      }
      sort = function(a, b) {
        var ary, dax, day, l, len, obja, objb, ref6;
        ref6 = [[a, obja = {}], [b, objb = {}]];
        for (l = 0, len = ref6.length; l < len; l++) {
          ary = ref6[l];
          x = ary[0][0];
          y = ary[0][1];
          ary[1].diffx = (dax = x + box_center.x) > center.x ? dax - center.x : center.x - dax;
          ary[1].diffy = (day = y + box_center.y) > center.y ? day - center.y : center.y - day;
          ary[1].diff = ary[1].diffx + ary[1].diffy;
          if (x < 0 || x + width > page_width) {
            ary[1].diff += 10000;
          }
          if (y < 0 || y + height > page_height) {
            ary[1].diff += 10000;
          }
        }
        return obja.diff - objb.diff;
      };
      points.sort(sort);
      return {
        x: parseInt(((x = points[0][0]) < 0 || x + width > page_width ? center.x - box_center.x : x), 10),
        y: parseInt(((y = points[0][1]) < 0 || y + height > page_height ? center.y - box_center.y : y), 10)
      };
    };
    this.videoLightning = videoLightning;
    this.vlData = {};
    this.vlData.instances = [];
    this.vlData.ytReady = (function(_this) {
      return function() {
        return _this.vlData.ytAPIReady = true;
      };
    })(this);
    this.vlData.youtube = this.vlData.vimeo = false;
    if (typeof $ !== 'undefined') {
      return $.fn.jqueryVideoLightning = function(options) {
        this.each(function() {
          var inst;
          if (!$.data(this, 'plugin_jqueryVideoLightning')) {
            inst = new VideoLightning({
              el: this,
              opts: options
            });
            vlData.instances.push(inst);
            $.data(this, 'plugin_jqueryVideoLightning', inst);
          }
        });
        return _initYTAPI();
      };
    }
  })(document);

}).call(this);

//# sourceMappingURL=videoLightning.js.map
