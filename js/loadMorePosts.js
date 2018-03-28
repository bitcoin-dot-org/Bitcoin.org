$(function () {
  var list = $(".event");
  list.slice(0, 6).show();
  $("#loadMore").on('click', function (e) {
    e.preventDefault();
    $(".event:hidden").slice(0, 6).slideDown();
    if ($(".event:hidden").length == 0) {
      $("#loadMore").fadeOut('slow');
      $(".eventtable").addClass("is-open")
    }
  });
});
