 ```diff
--- a/index.html
+++ b/index.html
@@ -0,0 +0,0 @@
--- a/index.html
+++ b/index.html
@@ -0,0 +0,0 @@
--- a/_config.yml
+++ b/_config.yml
@@ -0,0 +0,0 @@
--- a/en/earn.html
+++ b/en/earn.html
@@ -0,0 +1,20 @@
+---
+layout: base
+lang: en
+id: earn
+---
+<div class="hero">
+  <div class="container hero-container">
+    <h1>{% translate earn-bitcoin %}</h1>
+    <p class="summary">{% translate earn-bitcoin-desc %}</p>
+  </div>
+</div>
+
+<div class="container">
+  <div class="row card-row">
+    <div class="card">
+      <h2>{% translate earn-platforms %}</h2>
+      <p>{% translate earn-platforms-desc %}</p>
+    </div>
+  </div>
+</div>
--- a/_translations/en.yml
+++ b/_translations/en.yml
@@ -0,0 +0,0 @@
--- a/_includes/templates/index.html
+++ b/_includes/templates/index.html
@@ -0,0 +0,0 @@
--- a/_layouts/base.html
+++ b/_layouts/base.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/footer.html
+++ b/_includes/layout/base/footer.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/header.html
+++ b/_includes/layout/base/header.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/nav.html
+++ b/_includes/layout/base/nav.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/hero.html
+++ b/_includes/layout/base/hero.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/scripts.html
+++ b/_includes/layout/base/scripts.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/styles.html
+++ b/_includes/layout/base/styles.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/analytics.html
+++ b/_includes/layout/base/analytics.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/meta.html
+++ b/_includes/layout/base/meta.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/favicons.html
+++ b/_includes/layout/base/favicons.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/social.html
+++ b/_includes/layout/base/social.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/search.html
+++ b/_includes/layout/base/search.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/lang.html
+++ b/_includes/layout/base/lang.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/alert.html
+++ b/_includes/layout/base/alert.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/breadcrumbs.html
+++ b/_includes/layout/base/breadcrumbs.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/pagination.html
+++ b/_includes/layout/base/pagination.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/comments.html
+++ b/_includes/layout/base/comments.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/related.html
+++ b/_includes/layout/base/related.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/share.html
+++ b/_includes/layout/base/share.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/tags.html
+++ b/_includes/layout/base/tags.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/toc.html
+++ b/_includes/layout/base/toc.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/author.html
+++ b/_includes/layout/base/author.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/date.html
+++ b/_includes/layout/base/date.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/time.html
+++ b/_includes/layout/base/time.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/reading-time.html
+++ b/_includes/layout/base/reading-time.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/word-count.html
+++ b/_includes/layout/base/word-count.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/category.html
+++ b/_includes/layout/base/category.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/series.html
+++ b/_includes/layout/base/series.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/navigation.html
+++ b/_includes/layout/base/navigation.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/previous-next.html
+++ b/_includes/layout/base/previous-next.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/back-to-top.html
+++ b/_includes/layout/base/back-to-top.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/scroll-indicator.html
+++ b/_includes/layout/base/scroll-indicator.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/progress-bar.html
+++ b/_includes/layout/base/progress-bar.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/reading-progress.html
+++ b/_includes/layout/base/reading-progress.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/last-modified.html
+++ b/_includes/layout/base/last-modified.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/edit-link.html
+++ b/_includes/layout/base/edit-link.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/history.html
+++ b/_includes/layout/base/history.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/source.html
+++ b/_includes/layout/base/source.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/license.html
+++ b/_includes/layout/base/license.html
@@ -0,0 +0,0 @@
--- a/_includes/layout/base/copyright.html
+++ b/_includes/layout/base/copyright