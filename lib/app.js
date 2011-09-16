$(document).ready(function(){
	var docked;
	var menu = document.getElementById('menu');
  var init = menu.offsetTop;

	window.onscroll = function () {
		if (!docked && (menu.offsetTop - scrollTop() < 0)) {
			menu.style.top = 0;
			menu.style.position = 'fixed';
			docked = true;
		} else if (docked && scrollTop() <= init) {
			menu.style.top = init + 'px';
			menu.style.position = 'absolute';
			docked = false;
		}
	};

});

function scrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}
