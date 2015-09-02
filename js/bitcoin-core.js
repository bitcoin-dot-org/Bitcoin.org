---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# This file depends on JQuery and JQuery UI, so it should be separate
# from the base and main JS files which don't depend on those libraries
---
"use strict";

{% comment %}
// Display modal pop-up on button clicks
// When using this, make sure each .popup element has a parameter
{% endcomment %}
$(".popup").each(function() {
  var this_id = "#" + $(this).attr('data-container');
  $(this).on('click', function(clicked) {
    $( this_id ).dialog({
      modal: true,
      show: true,
      hide: true,
      draggable: false,
      resizeable: false,
      width: Math.min($(window).width() * 0.9, 620),
      open: function() {
        $('.ui-widget-overlay').bind('click',function() {
          $(this_id).dialog('close');
        });
      },
      buttons: {
        "Close": function() {
          $( this ).dialog( "close" );
        }
      }
    });
  });
});

{% comment %}
// Used on en/bitcoin-core/privacy to show/hide columns based on button
// clicks
{% endcomment %}
$('.showcolumn').each(function() {
  $(this).on('click', function() {
    var class_name = $(this).attr('id');
    if (class_name === 'bitcoin_core') return;
    $('.showcolumn').toggleClass('active', false);
    $('.showcolumn#bitcoin_core, .showcolumn#' + class_name).toggleClass('active', true);
    $('.privacy-comparison th, .privacy-comparison td').toggle(false);
    $('.privacy-comparison td:first-child, .privacy-comparison th:first-child, .privacy-comparison .bitcoin_core').toggle(true);
    $('.privacy-comparison .' + class_name).toggle('highlight', 750);
  });
});

{% comment %}
// Used on en/bitcoin-core/features/validation to create an accordion-style
// effect within a table
{% endcomment %}
$(function() {
  $(".validation tr.details").hide();

  $(".validation tr.brief").click(function(){
      $(this).find("span").toggleClass("ui-icon-triangle-1-e").toggleClass("ui-icon-triangle-1-s");
      $(this).next("tr").fadeToggle();
  });
});

{% comment %}
// Used on the en/bitcoin-core/features/user-interface page to show wallets
// that support dedicated connections to Bitcoin Core.
{% endcomment %}
$(function() {
  $( ".wallet_accordion" ).accordion({
    active: -1,
    heightStyle: "content"
  });
});

{% comment %}
// Function to expand part of a section when clicked
{% endcomment %}
$(function() {
  $(".show_more").hide();
  $(".toggle_show_more_less").show();

  $(".toggle_show_more_less").click(function() {
    $(".show_more").fadeToggle();
    $(".toggle_show_more_less").hide();
  });
});

{% comment %}// Used on bitcoin-core/feature/requirements{% endcomment %}
$(function() {
  $( "#system-requirements-accordion" ).accordion({
    active: -1,
    heightStyle: "content"
  });
});


{% comment %}
// Begin: slideshow JS, used on en/bitcoin-core/features/
// Some JS adapted from JQuery reference, MIT license
{% endcomment %}

  {% comment %}
  // start_slideshow:
  //   - container: jquery object containing the slideshow data
  {% endcomment %}
  function start_slideshow(container) {
    var group  = container.find('.slide-group');
    var slides = container.find('.slide');
    var buttons = container.find('.slide-btn');
    var button_array  = [];
    var current_index = 0;
    var timeout;
    {% comment %}
    // short_period: time between slide changes
    // long_period: time to change to the next slide after a slide has
    //              been manually selected
    {% endcomment %}
    var short_period = 3000;
    var long_period = short_period * 3;

    {% comment %}
    // move:
    //   - new_index: slide to move to
    //   - period: time to wait before moving to the next slide
    {% endcomment %}
    function move(new_index, period) {
      var animate_left;
      var slide_left;

      advance(period);

      {% comment %}
      // If we're already on the desired slide, don't do anything
      {% endcomment %}
      if (group.is(':animated') || current_index === new_index) {
        return;
      }

      button_array[current_index].removeClass('active');
      button_array[new_index].addClass('active');

      {% comment %}
      // Slide left or right
      {% endcomment %}
      if (new_index > current_index) {
        slide_left = '100%';
        animate_left = '-100%';
      } else {
        slide_left = '-100%';
        animate_left = '100%';
      }

      slides.eq(new_index).css({
        left: slide_left,
        display: 'block'
      });

      {% comment %}
      // Perform the animation
      {% endcomment %}
      group.animate({left: animate_left}, function() {
        slides.eq(current_index).css({
          display: 'none'
        });
        slides.eq(new_index).css({
          left: 0
        });
        group.css({
          left: 0
        });
        current_index = new_index;
      });
    }

    {% comment %}
    // Set timer to automatically advance to next slide
    {% endcomment %}
    function advance(period) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (current_index < (slides.length - 1)) {
          move(current_index + 1, short_period);
        } else {
          move(0, short_period);
        }
      }, period);
    }

    {% comment %}
    // For each slide, find its corresponding button and set an event
    // handler
    {% endcomment %}
    $.each(slides, function(index) {
      var button = $(buttons[index]);

      if (index === current_index) {
        button.addClass('active');
      }

      button.on('click', function() {
        move(index, long_period);
      });

      button_array.push(button);
    });

    advance(short_period);
  }

  {% comment %}
  // Change height of slider box to match scaled image size
  {% endcomment %}
  function change_slider_height() {
      {% comment %}
      // 125 is minimal height
      {% endcomment %}
      var revised_size = 125;

      {% comment %}
      // Look through each image since all but one will be hidden (0px)
      {% endcomment %}
      $(".slide img").each(function() {
        var img_height = $(this).height();
        if (img_height > revised_size) {
          revised_size = img_height;
        }
      });

      $(".slide-viewer").css('height', revised_size + "px");
  }

  {% comment %}
  // This only runs after all images have been loaded, which is required so
  // that the browser can autoscale them. However, that means the slidebox
  // will have its default height (as set by CSS) until everything is
  // loaded---which may make the slidebox a bad choice for pages with
  // slow-loading resources.
  {% endcomment %}
  $(document).load(function() {
    change_slider_height();
  });

  $(window).resize(function() {
    change_slider_height();
  });

{% comment %}
// End: slideshow JS
{% endcomment %}
