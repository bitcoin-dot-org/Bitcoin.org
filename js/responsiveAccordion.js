function responsiveAccordion() {
  $(".resp-acc-toggle").click(function() {
    if ($(window).width() <= 640) {
      //Expand or collapse this panel
      $(this)
        .next()
        .slideToggle("fast");
      $(this).toggleClass("active");

      //Hide the other panels
      $(".resp-acc-content")
        .not($(this).next())
        .slideUp("fast");
      $(".resp-acc-content")
        .not($(this))
        .removeClass("active");
    }
  });

  //Window resize function
  $(window).resize(function() {
    if ($(window).width() > 640) {
      $(".resp-acc-content").removeAttr("style");
    }
  });
}

responsiveAccordion();
