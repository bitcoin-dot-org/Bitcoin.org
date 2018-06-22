$(function () {
  var list = $(".post");
  list.slice(0, 6).show();
  $("#loadMore").on('click', function (e) {
    e.preventDefault();
    $(".post:hidden").slice(0, 6).slideDown();
    if ($(".post:hidden").length === 0) {
      $("#loadMore").fadeOut('slow');
      $(".post-list").addClass("is-open");
    }
  });
});
