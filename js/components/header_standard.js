( function( $ ) {
	// Drastically modified from the function in the WordPress Twenty Fifteen theme
	// Original source: https://github.com/WordPress/WordPress/blob/master/wp-content/themes/twentyfifteen/js/functions.js

	// In mobile-tablet mode make the menu show or hide
	$( '.header_standard--toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'header_standard--outside--on' );
		$('.header_standard--outside').toggleClass('header_standard--outside--on');
	} );

	// In mobile-tablet make the languge tab show and hide
	$( '.header_standard--outside--toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'header_standard--outside--toggle-on' );
		_this.parent().next( '.header_standard--outside--sub-menu' ).toggleClass( 'header_standard--outside--toggle-on' );
	} );

	// in destop mode make the navigation show and hide 
	$( '.header_standard--menu--toggle--introduction' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		if (!$('.header_standard--menu--dropdown--introduction').hasClass('header_standard--menu--dropdown--introduction--on')) {
			$('.header_standard--menu--dropdown-wrap').addClass('header_standard--menu--dropdown-wrap--on');
		} else {
			$('.header_standard--menu--dropdown-wrap').removeClass('header_standard--menu--dropdown-wrap--on');
		};

		if ($('.header_standard--menu--dropdown--resources').hasClass('header_standard--menu--dropdown--resources--on') 
			|| $('.header_standard--menu--dropdown--participate').hasClass('header_standard--menu--dropdown--participate--on')
			|| $('.header_standard--menu--dropdown--flags').hasClass('header_standard--menu--dropdown--flags--on') ) {
			$('.header_standard--menu--dropdown--resources').removeClass('header_standard--menu--dropdown--resources--on');
			$('.header_standard--menu--dropdown--participate').removeClass('header_standard--menu--dropdown--participate--on');
			$('.header_standard--menu--dropdown--flags').removeClass('header_standard--menu--dropdown--flags--on');
		};
		$('.header_standard--menu--dropdown--introduction').toggleClass('header_standard--menu--dropdown--introduction--on');

		if ($('.header_standard--menu--dropdown--introduction').hasClass('header_standard--menu--dropdown--introduction--on')) {

		};
	} );

	$( '.header_standard--menu--toggle--resources' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		if (!$('.header_standard--menu--dropdown--resources').hasClass('header_standard--menu--dropdown--resources--on')) {
			$('.header_standard--menu--dropdown-wrap').addClass('header_standard--menu--dropdown-wrap--on');
		} else {
			$('.header_standard--menu--dropdown-wrap').removeClass('header_standard--menu--dropdown-wrap--on');
		};
		if ($('.header_standard--menu--dropdown--introduction').hasClass('header_standard--menu--dropdown--introduction--on') 
			|| $('.header_standard--menu--dropdown--participate').hasClass('header_standard--menu--dropdown--participate--on')
			|| $('.header_standard--menu--dropdown--flags').hasClass('header_standard--menu--dropdown--flags--on') ) {
			$('.header_standard--menu--dropdown--introduction').removeClass('header_standard--menu--dropdown--introduction--on');
			$('.header_standard--menu--dropdown--participate').removeClass('header_standard--menu--dropdown--participate--on');
			$('.header_standard--menu--dropdown--flags').removeClass('header_standard--menu--dropdown--flags--on');
		};
		$('.header_standard--menu--dropdown--resources').toggleClass('header_standard--menu--dropdown--resources--on');
	} );

	$( '.header_standard--menu--toggle--participate' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		if (!$('.header_standard--menu--dropdown--participate').hasClass('header_standard--menu--dropdown--participate--on')) {
			$('.header_standard--menu--dropdown-wrap').addClass('header_standard--menu--dropdown-wrap--on');
		} else {
			$('.header_standard--menu--dropdown-wrap').removeClass('header_standard--menu--dropdown-wrap--on');
		};
		if ($('.header_standard--menu--dropdown--resources').hasClass('header_standard--menu--dropdown--resources--on') 
			|| $('.header_standard--menu--dropdown--introduction').hasClass('header_standard--menu--dropdown--introduction--on')
			|| $('.header_standard--menu--dropdown--flags').hasClass('header_standard--menu--dropdown--flags--on')) {
			$('.header_standard--menu--dropdown--resources').removeClass('header_standard--menu--dropdown--resources--on');
			$('.header_standard--menu--dropdown--introduction').removeClass('header_standard--menu--dropdown--introduction--on');
			$('.header_standard--menu--dropdown--flags').removeClass('header_standard--menu--dropdown--flags--on');
		};
		$('.header_standard--menu--dropdown--participate').toggleClass('header_standard--menu--dropdown--participate--on');
	} );

	$( '.header_standard--menu--toggle--flags' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		if (!$('.header_standard--menu--dropdown--flags').hasClass('header_standard--menu--dropdown--flags--on')) {
			$('.header_standard--menu--dropdown-wrap').addClass('header_standard--menu--dropdown-wrap--on');
		} else {
			$('.header_standard--menu--dropdown-wrap').removeClass('header_standard--menu--dropdown-wrap--on');
		};
		if ($('.header_standard--menu--dropdown--resources').hasClass('header_standard--menu--dropdown--resources--on') 
			|| $('.header_standard--menu--dropdown--introduction').hasClass('header_standard--menu--dropdown--introduction--on') 
			|| $('.header_standard--menu--dropdown--participate').hasClass('header_standard--menu--dropdown--participate--on') ) {
			$('.header_standard--menu--dropdown--resources').removeClass('header_standard--menu--dropdown--resources--on');
			$('.header_standard--menu--dropdown--introduction').removeClass('header_standard--menu--dropdown--introduction--on');
			$('.header_standard--menu--dropdown--participate').removeClass('header_standard--menu--dropdown--participate--on');
		};

		$('.header_standard--menu--dropdown--flags').toggleClass('header_standard--menu--dropdown--flags--on');
	} );
})( jQuery );
