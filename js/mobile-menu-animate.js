// Mobile menu animation with smooth height transitions

// Note: Padding values (20px top/bottom) are hardcoded here rather than dynamically detected.
// This is intentional - using getComputedStyle() to detect padding may cause noticeable animation stuttering.
// Hardcoded values ensure perfectly smooth animations. Update these if CSS padding changes.

// Color changes made in the mobile menu may need to also be updated here if they effect the animation blending with the BG

(function() {
  'use strict';

  // Main hamburger menu animation
  window.animateMainMenu = function(menuElement, expand, duration) {
    duration = duration || 300;
    
    // Only animate on mobile
    if (window.innerWidth > 750) {
      menuElement.style.display = expand ? 'block' : 'none';
      return;
    }
    
    if (expand) {
      // Expanding - measure and animate
      menuElement.style.display = 'block';
      menuElement.style.overflow = 'hidden';
      
      // Fade in main menu links and language selector text
      var mainLinks = menuElement.querySelectorAll('li > a');
      for (var i = 0; i < mainLinks.length; i++) {
        mainLinks[i].style.opacity = '0';
        mainLinks[i].style.transition = 'opacity 250ms ease-out';
      }
      
      var langSelectText = document.querySelector('.center-select__text');
      if (langSelectText) {
        langSelectText.style.opacity = '0';
        langSelectText.style.transition = 'opacity 250ms ease-out';
      }
      
      // Measure full height accounting for expanded submenus
      menuElement.style.height = 'auto';
      
      // Check for expanded submenus and ensure their padding is included
      var expandedSubmenus = menuElement.querySelectorAll('li.hover > ul');
      for (var i = 0; i < expandedSubmenus.length; i++) {
        if (!expandedSubmenus[i].style.padding) {
          expandedSubmenus[i].style.padding = '20px 0';
        }
      }
      
      var targetHeight = menuElement.scrollHeight;
      
      // Start from 0
      menuElement.style.height = '0px';
      void menuElement.offsetHeight; // Force reflow
      
      // Animate to full height and fade in links
      menuElement.style.transition = 'height ' + duration + 'ms ease-out';
      menuElement.style.height = targetHeight + 'px';
      
      // Trigger link fade in
      setTimeout(function() {
        for (var i = 0; i < mainLinks.length; i++) {
          mainLinks[i].style.opacity = '1';
        }
        if (langSelectText) {
          langSelectText.style.opacity = '1';
        }
      }, 10);
      
      // Clean up after animation
      setTimeout(function() {
        menuElement.style.height = '';
        menuElement.style.overflow = '';
        menuElement.style.transition = '';
        for (var i = 0; i < mainLinks.length; i++) {
          mainLinks[i].style.opacity = '';
          mainLinks[i].style.transition = '';
        }
        if (langSelectText) {
          langSelectText.style.opacity = '';
          langSelectText.style.transition = '';
        }
      }, duration);
      
    } else {
      // Collapsing - animate to 0
      menuElement.style.overflow = 'hidden';
      menuElement.style.height = menuElement.scrollHeight + 'px';
      void menuElement.offsetHeight; // Force reflow
      
      // Fade submenu links to black during collapse animation
      var submenus = menuElement.querySelectorAll('li ul');
      var submenuLinks = menuElement.querySelectorAll('li ul a');
      
      for (var i = 0; i < submenus.length; i++) {
        if (submenus[i].style.display === 'block' || submenus[i].offsetParent !== null) {
          submenus[i].style.backgroundColor = '#000';
          submenus[i].style.borderColor = '#000';
        }
      }
      
      for (var j = 0; j < submenuLinks.length; j++) {
        submenuLinks[j].style.transition = 'color 300ms ease-out';
        submenuLinks[j].style.color = '#000';
      }
      
      menuElement.style.transition = 'height ' + duration + 'ms ease-out';
      menuElement.style.height = '0px';
      
      // Hide after animation and reset styles
      setTimeout(function() {
        menuElement.style.display = 'none';
        menuElement.style.height = '';
        menuElement.style.overflow = '';
        menuElement.style.transition = '';
        
        // Reset submenu styles
        for (var i = 0; i < submenus.length; i++) {
          submenus[i].style.backgroundColor = '';
          submenus[i].style.borderColor = '';
        }
        for (var j = 0; j < submenuLinks.length; j++) {
          submenuLinks[j].style.color = '';
          submenuLinks[j].style.transition = '';
        }
      }, duration);
    }
  };

  // Updated mobileMenuShow to use animation
  window.mobileMenuShow = function(e) {
    var show = function() {
      var mm = document.getElementById('menusimple');
      var ml = document.getElementById('langselect');
      var isExpanding = mm.style.display !== 'block';
      
      // Animate main menu
      window.animateMainMenu(mm, isExpanding, 300);
      
      // Handle language selector
      if (ml) {
        ml.style.display = isExpanding ? 'block' : 'none';
      }
      
      if (isExpanding) {
        addClass(mm, 'menutap');
      } else {
        removeClass(mm, 'menutap');
      }
      
      cancelEvent(e);
    };
    onTouchClick(e, show);
  };

  // Submenu animation (your existing working code)
  window.animateMenuHeight = function(element, expand, duration) {
    // Skip animation on desktop
    if (window.innerWidth > 750) {
      if (expand) {
        element.classList.add('hover');
      } else {
        element.classList.remove('hover');
      }
      return;
    }
    
    duration = duration || 300;
    
    var submenu = element.querySelector('ul');
    if (!submenu) return;
    
    // Measure height function
    var measureCleanHeight = function() {
      var originalTransition = submenu.style.transition;
      var originalPadding = submenu.style.padding;
      submenu.style.transition = 'none';
      
      var wasVisible = submenu.style.display !== 'none';
      var originalHeight = submenu.style.height;
      var originalOverflow = submenu.style.overflow;
      var originalPosition = submenu.style.position;
      var originalVisibility = submenu.style.visibility;
      var hadHoverClass = element.classList.contains('hover');
      
      element.classList.add('hover');
      submenu.style.display = 'block';
      submenu.style.position = 'absolute';
      submenu.style.visibility = 'hidden';
      submenu.style.height = 'auto';
      submenu.style.overflow = 'visible';
      submenu.style.padding = '0';
      
      void submenu.offsetHeight;
      var contentHeight = submenu.scrollHeight;
      
      // Add CSS padding back (20px top + 20px bottom = 40px total)
      var totalHeight = contentHeight + 40;
      
      // Restore original state
      if (!hadHoverClass) element.classList.remove('hover');
      submenu.style.display = wasVisible ? '' : 'none';
      submenu.style.height = originalHeight;
      submenu.style.overflow = originalOverflow;
      submenu.style.position = originalPosition;
      submenu.style.visibility = originalVisibility;
      submenu.style.transition = originalTransition;
      submenu.style.padding = originalPadding;
      
      return totalHeight;
    };
    
    if (expand) {
      // Expanding
      element.classList.add('hover');
      
      var targetHeight = measureCleanHeight();
      
      submenu.style.display = 'block';
      submenu.style.height = '0px';
      submenu.style.padding = '0';
      submenu.style.overflow = 'hidden';
      
      void submenu.offsetHeight;
      
      submenu.style.transition = 'height ' + duration + 'ms ease-out, padding ' + duration + 'ms ease-out';
      submenu.style.height = targetHeight + 'px';
      submenu.style.padding = ''; // Let CSS padding take over
      
      setTimeout(function() {
        if (submenu && element.classList.contains('hover')) {
          submenu.style.transition = '';
          submenu.style.overflow = '';
          submenu.style.padding = '';
        }
      }, duration);
      
    } else {
      // Collapsing
      var currentHeight = measureCleanHeight();
      
      submenu.style.height = currentHeight + 'px';
      submenu.style.padding = '';
      submenu.style.overflow = 'hidden';
      submenu.style.transition = 'none';
      
      void submenu.offsetHeight;
      
      submenu.style.transition = 'height ' + duration + 'ms ease-out, padding ' + duration + 'ms ease-out';
      submenu.style.height = '0px';
      submenu.style.padding = '0';
      
      setTimeout(function() {
        element.classList.remove('hover');
        submenu.style.display = '';
        submenu.style.height = '';
        submenu.style.overflow = '';
        submenu.style.transition = '';
        submenu.style.padding = '';
      }, duration);
    }
  };

  // Submenu hover handler (your existing working code)
  window.mobileMenuHover = function(e) {
    var t = getEvent(e, 'target');
    
    var initHover = function() {
      if (t.nodeName !== 'A') return;
      
      var targetLi = t.parentNode;
      var isExpanding = targetLi.className.indexOf('hover') === -1;
      
      var hasSubItemsCheck = function(el) {
        var checkEl = el;
        while (checkEl && checkEl.nodeName !== 'LI') checkEl = checkEl.parentNode;
        if (!checkEl) return false;
        return (checkEl.getElementsByTagName('UL').length > 0);
      };
      
      var hasSubItems = hasSubItemsCheck(t);
      if (!isExpanding && !hasSubItems) return;
      
      var p = targetLi;
      while (p.parentNode.nodeName === 'UL' || p.parentNode.nodeName === 'LI') p = p.parentNode;
      
      for (var i = 0, nds = p.getElementsByTagName('LI'), n = nds.length; i < n; i++) {
        if (nds[i] === targetLi) continue;
        if (hasSubItemsCheck(nds[i])) continue;
        
        if (nds[i].className.indexOf('hover') !== -1) {
          window.animateMenuHeight(nds[i], false, 300);
        }
      }
      
      if (hasSubItems) {
        window.animateMenuHeight(targetLi, isExpanding, 300);
      }
      
      var parentEl = t.parentNode;
      while (parentEl !== p) {
        if (parentEl.nodeName === 'LI' && parentEl !== targetLi) {
          if (isExpanding && parentEl.className.indexOf('hover') === -1) {
            parentEl.classList.add('hover');
          }
        }
        parentEl = parentEl.parentNode;
      }
    };
    
    var filterClick = function(e) {
      var t = getEvent(e, 'target');
      if (t.nodeName !== 'A') return;
      var checkEl = t;
      while (checkEl && checkEl.nodeName !== 'LI') checkEl = checkEl.parentNode;
      if (checkEl && checkEl.getElementsByTagName('UL').length > 0) {
        e.preventDefault();
      }
    };
    
    onTouchClick(e, initHover, filterClick);
  };

})();