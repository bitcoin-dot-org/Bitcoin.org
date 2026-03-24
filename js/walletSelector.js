var linksList = Array.prototype.slice.call(document.querySelectorAll('.wallet-link'));
var selectorsList = Array.prototype.slice.call(document.querySelectorAll('.js-wallet-selector'));
var sidebarOpenButton = document.getElementById('sidebarOpenButton');
var sidebarSelector = document.getElementById('sidebarSelector');
var platformSelectors = document.querySelectorAll('.platform-radio');

function queryStringToArray() {            
  var categories = ['platform', 'user', 'important', 'features'];
  var result = [];
  var pairs = location.search.slice(1).split('&');
  
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    if (pair[1] && categories.indexOf(pair[0]) > -1) result = result.concat(pair[1].split(','));
  });

  return result;
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function updateQueryStringParameter(key, value) {
  var uri = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function setUrlParameter(parameter, value) {
  history.pushState(null, null, updateQueryStringParameter(parameter, value));
}

function checkIfFiltersInclude(categories, filters) {
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    if (categories.indexOf(filter) === -1 && filter !== '') return false;
  }
  return true;
}

function changeAccordionButtonText(button, text) {
  button.textContent = text;
}

function sortTableColumn(selectedOption) {
  var tableAccordion = document.getElementById('tableAccordion');
  var tableAccordionButton = document.getElementById('tableAccordionButton');
  
  changeAccordionButtonText(tableAccordionButton, selectedOption);
  tableAccordion.classList.remove('open');

  var tableCells = document.querySelectorAll('.wallet-table-data[data-cell]');

  for (var i = 0; i < tableCells.length; i++) {
    var cell = tableCells[i];
    if (cell.dataset.cell === selectedOption) {
      cell.classList.remove('hidden');
    } else cell.classList.add('hidden');
  }
}

function displayRelevantScreen(relevantScreenName) {
  var screens = document.querySelectorAll('[data-screen-name]');
  for (var i = 0; i < screens.length; i++) {
    var screen = screens[i];
    if (screen.dataset.screenName ===  relevantScreenName) screen.classList.add('visible');
    else screen.classList.remove('visible');
  }
}

function displaySelectedHeaderValues(accordionType, selectedFilters, accordion) {
  if (selectedFilters && accordionType === 'important' || accordionType === 'features') {
    var text = selectedFilters.split(',').map(function(s) {
      return s.split('_').join(' ');
    }).join(', ');
    accordion.querySelector('.helper-selected-filter').textContent = text;
  } else if (selectedFilters) {
    var text = document.querySelector('input[value=' + selectedFilters + ']').dataset.text;
    accordion.querySelector('.helper-selected-filter').textContent = text;
  }
}

function openRelevantStepAccordion(selectedStep, accordionStep, accordion) {
  if (selectedStep === accordionStep) accordion.classList.add('active');
  else accordion.classList.remove('active');
}

function highlightCompletedHeader(selectedFilters, selectedStep, accordionStep, accordion) {
  if (selectedFilters && selectedStep !== accordionStep) {
      accordion.querySelector('.helper-selected-block').classList.add('visible');
      accordion.classList.add('complete');
    } else {
      accordion.querySelector('.helper-selected-block').classList.remove('visible');
      accordion.classList.remove('complete');
    }
}

function highlightSelectedWizardInputs() {
  var filters = queryStringToArray();
  var inputsList = document.querySelectorAll('.js-wizard-selector');
  
  for (var i = 0; i < inputsList.length; i++) {
    var input = inputsList[i];  
    if (filters.indexOf(input.value) > -1) input.checked = true;
    else input.checked = false;
  }
  
}

function displayRelevantWizardContent(selectedStep) {    
  var accordionsList = document.querySelectorAll('.js-helper-accordion');
  
  for (var i = 0; i < accordionsList.length; i++) {
    var accordion = accordionsList[i];
    var accordionType = accordion.dataset.type;
    var accordionStep = accordion.dataset.number;
    var selectedFilters = getUrlParameter(accordionType);
    
    openRelevantStepAccordion(selectedStep, accordionStep, accordion);
    highlightCompletedHeader(selectedFilters, selectedStep, accordionStep, accordion);
    displaySelectedHeaderValues(accordionType, selectedFilters, accordion);
  }
  

  checkInputsActivity();
}

function scrollToHeader(number) {
  document.querySelector('[data-number="' + number + '"]').scrollIntoView();
}

function isInViewport(element) {
  var bounding = element.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToNextButton(buttonType) {
  var nextButton = document.querySelector('[data-button-type="' + buttonType + '"]');
  if (!isInViewport(nextButton)) {
    nextButton.scrollIntoView(false);
    window.scrollBy(0, 20); 
  }
}

function displayNextButton() {
  var nextButtonsList = document.querySelectorAll('[data-button-type]');
  
  for (var i = 0; i < nextButtonsList.length; i++) {
    var button = nextButtonsList[i];
    var radioType = button.dataset.buttonType;
    var checkedRadio = document.querySelector('.js-helper-radio[name="' + radioType + '"]:checked');
    if (checkedRadio) button.classList.add('visible');
  }
  
}

function onNavigationButtonClick(button) {
  var step = button.dataset.selector;
  setUrlParameter('step', step);
  displayRelevantContent(step);
  scrollToHeader(step);
}

function onSkipButtonClick() {
  clearUrlParameters();
  setUrlParameter('step', '5');
  displayRelevantContent();
}

function disableInputs(isDisabled) {
  var checkboxes = document.querySelectorAll('.js-wallet-selector:not(.platform-radio)');

  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    checkbox.disabled = isDisabled;
  }
}

function checkIfPlatformSelected(filters) {
  var platforms = [];
  
  for (var i = 0; i < platformSelectors.length; i++) {
    var selector = platformSelectors[i];
    platforms.push(selector.value);
  }
  
  for (var j = 0; j < platforms.length; j++) {
    var platform = platforms[j];
    if (filters.indexOf(platform) > -1) return true;
  }
  return false;
}

function highlightCheckedSelectorInputs(filters) {
  if (checkIfPlatformSelected(filters)) {  
    for (var i = 0; i < selectorsList.length; i++) {
      var selector = selectorsList[i];
      if (filters.indexOf(selector.value) > -1) selector.checked = true;
      else selector.checked = false;
    }
  } 
}

function setWalletsVisibility(filters) {

  for (var i = 0; i < linksList.length; i++) {
    var link = linksList[i];
    var categories = link.dataset.categories.split(' ');
    if (checkIfFiltersInclude(categories, filters) && checkIfPlatformSelected(filters)) link.classList.add('visible');
    else link.classList.remove('visible');
  }
}

function displaySelectedOs() {
  var selectedOs = document.querySelector('.js-platform-radio:checked');
  var selectedOsValue = selectedOs.value;
  if (selectedOsValue === 'ios') selectedOsValue = 'iOS';
  else selectedOsValue = selectedOsValue.charAt(0).toUpperCase() + selectedOsValue.slice(1);
  document.getElementById('selectedOs').textContent = selectedOsValue;
}

function displaySelectorSection(relevantSectionName) {
  var sectionsList = document.querySelectorAll('[data-section-name]');

  for (var i = 0; i < sectionsList.length; i++) {
    var section = sectionsList[i];
    if (section.dataset.sectionName ===  relevantSectionName) section.classList.add('visible');
    else section.classList.remove('visible');
  }
}

function displayRelevantSelectortSection(filters) {
  var visibleWallets = document.querySelectorAll('.wallet-link.visible');
  var selectedCategories = filters;
  var isWalletsVisible = !!visibleWallets.length;
  var isPlatformSelected = checkIfPlatformSelected(selectedCategories);
  
  if (!isWalletsVisible && !isPlatformSelected) {
    displaySelectorSection('browseWallets');
  } else if (!isWalletsVisible && selectedCategories) {
    displaySelectorSection('noMatch');
  } else {
    displaySelectorSection('walletsList');
    displaySelectedOs();
  }
}

var inputsList = document.querySelectorAll('.js-wallet-selector');
var walletsList = document.querySelectorAll('.wallet-link');

function disableUnavailableInputs() {
  var platform = getUrlParameter('platform');
  if (!platform) {
    disableInputs(true);
    return;
  }
  
  for (var i = 0; i < inputsList.length; i++) {
    var input = inputsList[i];
    var filtersList = queryStringToArray();
    filtersList.push(input.value);
    
    var matchedWallets = [];
    for (var j = 0; j < walletsList.length; j++) {
      var wallet = walletsList[j];
      var isWalletMatch = true;

      for (var k = 0; k < filtersList.length; k++) {
        var filter = filtersList[k];
        var walletCategories = wallet.dataset.categories.split(' ');
        if (walletCategories.indexOf(filter) === -1) {
          isWalletMatch = false;
          break;
        }
      }

      isWalletMatch && matchedWallets.push(wallet);
    }
    
    if (!matchedWallets.length && input.name !== 'platform') {
      input.disabled = true;
      input.parentNode.classList.add('disabled');
    } else {
      input.disabled = false;
      input.parentNode.classList.remove('disabled');
    }
  }

  var isNewUserInputDisabled = document.querySelector('.js-wallet-selector[value="beginner"]').disabled;
  var experiencedUser = document.querySelector('.js-wallet-selector[value="experienced"]');
  if (isNewUserInputDisabled) experiencedUser.checked = true;
}

function displayRelevantSelectorContent() {
  var filters = queryStringToArray();

  highlightCheckedSelectorInputs(filters);
  setWalletsVisibility(filters);
  displayRelevantSelectortSection(filters);
  displaySelectedCheckbox();
  disableUnavailableInputs();
}

function checkParametersValues(parameterName, parameterValues) {
  var filters = parameterValues.split(',');
  var inputValues = [];
  var inputsList = document.getElementsByName(parameterName);

  for (var i = 0; i < inputsList.length; i++) {
    var input = inputsList[i];
    inputValues.push(input.value);
  }
  
  for (var j = 0; j < filters.length; j++) {
    var filter = filters[j];
    if (inputValues.indexOf(filter) === -1) return false;
  }
  return true;
}

function verifyPreviousStepsChecks(step) {
  for (var i = step - 1; i > 0; i--) {
    if (i > 2) continue;
    var parameterName = document.querySelector('[data-number="' + i + '"]').dataset.type;
    var parameterValues = getUrlParameter(parameterName);
    if (!parameterValues || !checkParametersValues(parameterName, parameterValues)) return false;
  }
  return true;
}

function clearUrlParameters() {
  window.history.replaceState(null, null, window.location.pathname);
}

function displayDiscoverBox(currentStep) {
  var discoverBoxLinks = document.querySelectorAll('.discover-links-list[data-links-step]');

  for (var i = 0; i < discoverBoxLinks.length; i++) {
    var linksList = discoverBoxLinks[i]; 
    if (linksList.dataset.linksStep === currentStep) linksList.classList.add('visible');
    else linksList.classList.remove('visible');
  }
}
  
function collectCheckedInputsValues(selectedInputs) {
  var selectedInputsValues = [];

  for (var i = 0; i < selectedInputs.length; i++) {
    var selectedInput = selectedInputs[i];
    selectedInputsValues.push(selectedInput.value);
  }
  
  return selectedInputsValues;
}

function renderCheckboxesHTML(filters, position) {
  filters = filters.split(',');
  var template = '<div class="checkboxes-acc-selected"><p class="checkboxes-acc-selected-text">%value%</p><button class="checkboxes-acc-selected-remove" data-checkbox-remove="%attribute%"><img src="/img/icons/close-btn.svg" alt="close"></button></div>';

  position.innerHTML = '';
  filters.forEach(function(filter) {
    var html = template.replace('%value%', filter.split('_').join(' '));
    html = html.replace('%attribute%', filter);
    position.insertAdjacentHTML("beforeend", html);
  });
}

function displaySelectedCheckbox() {
  var importantFilters = getUrlParameter('important');
  var featuresFilters = getUrlParameter('features');
  var importantSelectedBox = document.getElementById('importantSelectedBox');
  var featuresSelectedBox = document.getElementById('featuresSelectedBox');
  
  if (importantFilters) renderCheckboxesHTML(importantFilters, importantSelectedBox);
  else importantSelectedBox.innerHTML = '';
  
  if (featuresFilters) renderCheckboxesHTML(featuresFilters, featuresSelectedBox);
  else featuresSelectedBox.innerHTML = '';

  var removeCheckboxFilterButtons = document.querySelectorAll('.checkboxes-acc-selected-remove');

  for (var i = 0; i < removeCheckboxFilterButtons.length; i++) {
    var button = removeCheckboxFilterButtons[i];
    button.addEventListener('click', function() {
      removeCheckboxFilter(button.dataset.checkboxRemove);
      sortTableColumn('control');
    });
  }
  
}

function checkUserInputsActivity(selectedPlatform) {
  setWalletsVisibility([selectedPlatform, 'beginner']);
  var wallets = document.querySelectorAll('.wallet-link.visible');
  var separatorText = document.querySelector('.helper-user-separator');
  if (!wallets.length) {
    setUrlParameter('user', 'experienced');
    separatorText.classList.add('disabled');
  } else separatorText.classList.remove('disabled');
}

function checkInputsActivity() {
  var inputsList = document.querySelectorAll('.js-wizard-selector');
  var selectedPlatform = getUrlParameter('platform');
  if (selectedPlatform) checkUserInputsActivity(selectedPlatform);
  
  for (var i = 0; i < inputsList.length; i++) {
    var input = inputsList[i];
    var filters = queryStringToArray();
    filters.push(input.value);
    setWalletsVisibility(filters);
    var wallets = document.querySelectorAll('.wallet-link.visible');
    if (!wallets.length && input.name !== 'platform') input.disabled = true;
    else input.disabled = false;
  }
  
}

function clearSelection(type) {
  var accordion = document.querySelector('.js-helper-accordion[data-type="' + type + '"]');
  accordion.classList.remove('complete');
  accordion.querySelector('.helper-selected-block').classList.remove('visible');
  setUrlParameter(type, '');
}

function onWizardRadioChange(radio) {
  var radioName = radio.name;
  var selectedInputValue = document.querySelector('.js-wizard-selector[name="' + radioName + '"]:checked').value;
  setUrlParameter(radioName, selectedInputValue);
  
  if (radioName === 'platform' && getUrlParameter('important')) clearSelection('important');
  if (radioName === 'platform' && getUrlParameter('features')) clearSelection('features');
  
  displayNextButton();
  scrollToNextButton(radioName);
}

function onWizardCheckboxChange(checkbox) {
  var selectedCheckboxes = document.querySelectorAll('.js-helper-checkbox[name="' + checkbox.name + '"]:checked');
  var filters = collectCheckedInputsValues(selectedCheckboxes);
  setUrlParameter(checkbox.name, filters);
}

function updateOldUrls(input) {
  var pathnameElements = window.location.pathname.split('/');
  
  if (pathnameElements.indexOf('wallets') > -1) {
    var pathnameFirstElement = pathnameElements[0];
    var pathnameLastElement = pathnameElements[pathnameElements.length - 1];
    if (pathnameFirstElement === '') pathnameElements.shift();
    if (pathnameLastElement === '') pathnameElements.pop();
    
    var url;
    if (window.location.port) {
      url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + input.dataset.path + window.location.search;
    } else {
      url = window.location.protocol + '//' + window.location.hostname + input.dataset.path + window.location.search;
    }

    history.pushState(null, null, url);
  }
}

function onWalletSelectorInputChange(input) {
  var selectedInputs = document.querySelectorAll('.js-wallet-selector[name="' + input.name + '"]:checked');
  var filters = collectCheckedInputsValues(selectedInputs);

  if (input.name === 'platform') {
    clearUrlParameters();
    setUrlParameter('step', '5');
    setUrlParameter('platform', input.value);
  } else setUrlParameter(input.name, filters);
  
  displayRelevantSelectorContent();
}

function toggleSidebarVisibility() {
  sidebarOpenButton.classList.toggle('visible');
  sidebarSelector.classList.toggle('hidden');
}

function removeCheckboxFilter(filterValue) {
  var filter = document.querySelector('.js-wallet-selector[value="' + filterValue +'"]');
  filter.checked = false;
  onWalletSelectorInputChange(filter);
}

function setListeners() {
  var navigationButtons = Array.prototype.slice.call(document.querySelectorAll('.js-helper-nav-btn'));
  navigationButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      onNavigationButtonClick(button);
    });
  });

  
  var wizardRadioList = Array.prototype.slice.call(document.querySelectorAll('.js-helper-radio'));
  wizardRadioList.forEach(function(radio) {
    radio.addEventListener('change', function() {
      onWizardRadioChange(radio);
      checkInputsActivity();
    });
  });
  
  var wizardCheckboxesList = Array.prototype.slice.call(document.querySelectorAll('.js-helper-checkbox'));
  wizardCheckboxesList.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      onWizardCheckboxChange(checkbox);
      checkInputsActivity();
    });
  });
  
  var skipButtons = Array.prototype.slice.call(document.querySelectorAll('.js-skip-btn'));
  skipButtons.forEach(function(button) {
    button.addEventListener('click', onSkipButtonClick);
  });

  var walletSelectorPlatforms = Array.prototype.slice.call(document.querySelectorAll('.js-platform-radio'));
  walletSelectorPlatforms.forEach(function(input) {
    input.addEventListener('change', function() {
      updateOldUrls(input);
    });
  });
  
  selectorsList.forEach(function(selector) {
    selector.addEventListener('change', function() {
      onWalletSelectorInputChange(selector);
    });
  });
  
  linksList.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute("href");
      location.href = href + window.location.search;
      e.preventDefault();
    });
  });

  sidebarOpenButton.addEventListener('click', toggleSidebarVisibility);

  var sidebarCloseButton = document.getElementById('sidebarCloseButton');
  sidebarCloseButton.addEventListener('click', toggleSidebarVisibility);
  
  var filtersAccordionButtons = Array.prototype.slice.call(document.querySelectorAll('.checkboxes-acc-btn'));
  filtersAccordionButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      button.parentNode.parentNode.classList.toggle('open');
    });
  });
  
  var accordionButtons = Array.prototype.slice.call(document.querySelectorAll('.acc-btn'));
  accordionButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      this.parentNode.classList.toggle('open');
    });
  });
  
  var tableSortButtons = Array.prototype.slice.call(document.querySelectorAll('.table-sort-btn'));
  tableSortButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      sortTableColumn(button.dataset.sort);
    });
  });
  
  window.addEventListener('popstate', function() {
    displayRelevantContent();
  });
}

function checkOldUrls() {
  var pathnameElements = window.location.pathname.substr(1).slice(0, -1).split('/');
  
  for (var i = 0; i < platformSelectors.length; i++) {
    var platform = platformSelectors[i].value;
    
    if (pathnameElements.indexOf(platform) > -1) {
      setUrlParameter('platform', platform);
      setUrlParameter('step', 5);
      break;
    }
  }
}

function displayRelevantContent() {
  var step = getUrlParameter('step');
  var currentStep = Number(step);
  var isWizardStep = currentStep > 0 && currentStep < 5;
  var isSelectorStep = currentStep === 5;
  if (isWizardStep && verifyPreviousStepsChecks(currentStep)) {
    displayRelevantScreen('wizard');
    highlightSelectedWizardInputs();
    displayNextButton();
    displayRelevantWizardContent(step);
    displayDiscoverBox(step);
  } else if (isSelectorStep) {
    displayRelevantScreen('selector');
    displayRelevantSelectorContent();
    sortTableColumn('control');
  } else {
    displayRelevantScreen('intro');
  }
}

function init() {
  checkOldUrls();
  displayRelevantContent();
  setListeners();
}
init();