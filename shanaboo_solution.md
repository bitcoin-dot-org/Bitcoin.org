 ```diff
--- a/en/getting-started.html
+++ b/en/getting-started.html
@@ -1,3 +1,6 @@
+---
+---
+
 <!DOCTYPE html>
 <html lang="en">
 
@@ -5,7 +8,6 @@
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
-  {% include base.html %}
   <title>Getting started - Bitcoin</title>
   
   <meta name="description" content="Bitcoin.org is a community funded project, donations are appreciated and used to improve the website.">
@@ -13,7 +15,7 @@
   <meta name="robots" content="noindex">
   <meta name="googlebot" content="noindex">
   
-  <link rel="stylesheet" href="/css/bootstrap.css?{{site.time | date: '%s'}}">
+  <link rel="stylesheet" href="/css/bootstrap.css">
   <link rel="stylesheet" href="/css/ie.css">
   <link rel="stylesheet" href="/css/ie8.css">
   <link rel="stylesheet" href="/css/font-awesome/css/font-awesome.min.css">
@@ -21,7 +23,7 @@
   <link rel="stylesheet" href="/css/sans.css">
   <link rel="stylesheet" href="/css/ie8.css">
   <link rel="stylesheet" href="/css/ie.css">
-  <link rel="stylesheet" href="/css/main.css?{{site.time | date: '%s'}}">
+  <link rel="stylesheet" href="/css/main.css">
   
   <script src="/js/main.js"></script>
   <script type="text/javascript" src="/js/scrollmagic/minified/ScrollMagic.min.js"></script>
@@ -29,7 +31,7 @@
   <script type="text/javascript" src="/js/scrollmagic/minified/plugins/animation.gsap.min.js"></script>
   <script type="text/javascript" src="/js/scrollmagic/minified/plugins/debug.addIndicators.min.js"></script>
   
-  <link rel="shortcut icon" href="/img/favicon.ico?{{site.time | date: '%s'}}">
+  <link rel="shortcut icon" href="/img/favicon.ico">
   
   <!--[if lt IE 8]>
   <script src="/js/ie8.js"></script>
@@ -37,7 +39,7 @@
   
   <!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
-  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
+  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
   <![endif]-->
 
 </head>
@@ -47,7 +49,7 @@
   <div id="detectmobile" class="detectmobile"></div>
 
   <div class="banner-message default">
-    <a href="https://bitcoin.org/en/alert/2017-07-12-potential-network-disruption"><span class="warningicon"></span>Bitcoin.org is community supported: <span class="btn-bottom">Donate</span></a>
+    <a href="/en/alert/2017-07-12-potential-network-disruption"><span class="warningicon"></span>Bitcoin.org is community supported: <span class="btn-bottom">Donate</span></a>
   </div>
 
   <div class="head"><div>
@@ -56,7 +58,7 @@
 
     <div class="langselect">
       <select onchange="if (this.value != 0) window.location.href=this.value">
-        <option value="0">English</option>
+        <option value="0" selected>English</option>
       </select>
     </div>
 
@@ -67,7 +69,7 @@
       <li><a href="/en/vocabulary">Vocabulary</a></li>
       <li><a href="/en/events">Events</a></li>
       <li><a href="/en/press">Press</a></li>
-      <li><a href="https://bitcoin.org/en/blog">Blog</a></li>
+      <li><a href="/en/blog">Blog</a></li>
     </ul>
 
   </div></div>
@@ -77,7 +79,7 @@
     <div class="wrapper">
 
       <div class="gettingstarted">
-        <img src="/img/icons/getting_started.svg?{{site.time | date: '%s'}}" alt="getting started">
+        <img src="/img/icons/getting_started.svg" alt="getting started">
         <h1>Getting started with Bitcoin</h1>
         <p class="summary">Using Bitcoin is the first thing you can do to support Bitcoin. There are probably many cases where it can make your life easier. You can accept payments and make purchases with Bitcoin.</p>
       </div>
@@ -88,7 +90,7 @@
           <div class="col-md-4">
             <div class="row">
               <div class="col-xs-12 col-md-3 gettingstarted_icon">
-                <img src="/img/icons/inform.svg?{{site.time | date: '%s'}}" alt="inform">
+                <img src="/img/icons/inform.svg" alt="inform">
               </div>
               <div class="col-xs-12 col-md-9">
                 <h2 id="inform">Inform yourself</h2>
@@ -101,7 +103,7 @@
           <div class="col-md-4">
             <div class="row">
               <div class="col-xs-12 col-md-3 gettingstarted_icon">
-                <img src="/img/icons/choose.svg?{{site.time | date: '%s'}}" alt="choose">
+                <img src="/img/icons/choose.svg" alt="choose">
               </div>
               <div class="col-xs-12 col-md-9">
                 <h2 id="choose">Choose your wallet</h2>
@@ -114,7 +116,7 @@
           <div class="col-md-4">
             <div class="row">
               <div class="col-xs-12 col-md-3 gettingstarted_icon">
-                <img src="/img/icons/buy.svg?{{site.time | date: '%s'}}" alt="buy">
+                <img src="/img/icons/buy.svg" alt="buy">
               </div>
               <div class="col-xs-12 col-md-9">
                 <h2 id="buy">Get Bitcoin</h2>
@@ -129,7 +131,7 @@
           <div class="col-md-4">
             <div class="row">
               <div class="col-xs-12