(function() {
'use strict';

var walletFinderPage = document.querySelector('.wallet-finder-page');
if (!walletFinderPage) return;

var linksList = Array.prototype.slice.call(document.querySelectorAll('.wallet-link'));
var selectorsList = Array.prototype.slice.call(document.querySelectorAll('.js-wallet-selector'));
var sidebarOpenButton = document.getElementById('sidebarOpenButton');
var sidebarSelector = document.getElementById('sidebarSelector');
var sidebarScrim = document.getElementById('sidebarScrim');
var walletSelectorScreen = document.querySelector('.wallet-selector');
var platformSelectors = document.querySelectorAll('.platform-radio');
var sidebarMediaQuery = window.matchMedia('(max-width: 820px)');

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

function replaceUrlParameter(parameter, value) {
  history.replaceState(null, null, updateQueryStringParameter(parameter, value));
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

function normalizeWalletOrderSeed(value) {
  var uint32Size = 4294967296;
  return ((Number(value) % uint32Size) + uint32Size) % uint32Size;
}

function createWalletOrderSeed() {
  if (window.crypto && window.crypto.getRandomValues && window.Uint32Array) {
    try {
      var randomValues = new Uint32Array(1);
      window.crypto.getRandomValues(randomValues);
      return randomValues[0];
    } catch (error) {
      // Fall back when random values are blocked by the browser.
    }
  }

  return normalizeWalletOrderSeed(
    Math.floor(Math.random() * 4294967296) + new Date().getTime()
  );
}

function getWalletOrderSeed() {
  var storageKey = 'bitcoinOrgWalletOrderSeedV1';
  var storedSeed = null;

  try {
    storedSeed = window.sessionStorage.getItem(storageKey);
  } catch (error) {
    storedSeed = null;
  }

  if (storedSeed !== null && /^\d+$/.test(storedSeed)) {
    return normalizeWalletOrderSeed(storedSeed);
  }

  var seed = createWalletOrderSeed();

  try {
    window.sessionStorage.setItem(storageKey, String(seed));
  } catch (error) {
    // The order remains random for this page load when storage is unavailable.
  }

  return seed;
}

function createSeededRandom(seed) {
  var state = normalizeWalletOrderSeed(seed);

  return function() {
    state = normalizeWalletOrderSeed(state * 1664525 + 1013904223);
    return state / 4294967296;
  };
}

function shuffleWalletRows() {
  var walletTable = document.querySelector('.wallet-table');
  if (!walletTable || linksList.length < 2) return;

  var shuffledRows = linksList.slice();
  var random = createSeededRandom(getWalletOrderSeed());

  for (var i = shuffledRows.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(random() * (i + 1));
    var currentRow = shuffledRows[i];
    shuffledRows[i] = shuffledRows[randomIndex];
    shuffledRows[randomIndex] = currentRow;
  }

  var shuffledRowsFragment = document.createDocumentFragment();
  for (var j = 0; j < shuffledRows.length; j++) {
    shuffledRowsFragment.appendChild(shuffledRows[j]);
  }
  walletTable.appendChild(shuffledRowsFragment);

  linksList = shuffledRows;
  walletsList = walletTable.querySelectorAll('.wallet-link');
}

function sortTableColumn(selectedOption) {
  var tableAccordion = document.getElementById('tableAccordion');
  var tableAccordionButton = document.getElementById('tableAccordionButton');
  var selectedButton = document.querySelector('.table-sort-btn[data-sort="' + selectedOption + '"]');
  var selectedLabel = selectedButton ? selectedButton.textContent.replace(/^\s+|\s+$/g, '') : selectedOption;
  
  changeAccordionButtonText(tableAccordionButton, selectedLabel);
  tableAccordion.classList.remove('open');
  tableAccordionButton.setAttribute('aria-expanded', 'false');

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

  if (relevantScreenName !== 'selector' && walletSelectorScreen.classList.contains('filters-open')) {
    setSidebarVisibility(false, false);
  }
}

function displaySelectedHeaderValues(accordionType, selectedFilters, accordion) {
  if (selectedFilters && (accordionType === 'important' || accordionType === 'features')) {
    var text = selectedFilters.split(',').map(function(s) {
      return getFilterLabel(s);
    }).filter(function(label) {
      return label !== '';
    }).join(', ');
    accordion.querySelector('.helper-selected-filter').textContent = text;
  } else if (selectedFilters) {
    var selectedInput = document.querySelector('.js-wizard-selector[value="' + selectedFilters + '"]');
    accordion.querySelector('.helper-selected-filter').textContent = selectedInput.dataset.text;
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

  updateProgressIndicator(selectedStep);
  checkInputsActivity();
}

function updateProgressIndicator(selectedStep) {
  var currentStep = Number(selectedStep);
  var progressButtons = document.querySelectorAll('.wallet-finder-progress-step');

  for (var i = 0; i < progressButtons.length; i++) {
    var button = progressButtons[i];
    var buttonStep = Number(button.dataset.progressStep);
    var canNavigate = buttonStep === 1 || verifyPreviousStepsChecks(buttonStep);

    button.disabled = !canNavigate;
    button.classList.toggle('active', buttonStep === currentStep);
    button.classList.toggle('complete', buttonStep < currentStep);

    if (buttonStep === currentStep) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  }
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
    nextButton.scrollIntoView({ block: 'nearest' });
  }
}

function displayNextButton() {
  var nextButtonsList = document.querySelectorAll('[data-button-type]');
  
  for (var i = 0; i < nextButtonsList.length; i++) {
    var button = nextButtonsList[i];
    var radioType = button.dataset.buttonType;
    var checkedRadio = document.querySelector('.js-helper-radio[name="' + radioType + '"]:checked');
    button.classList.toggle('visible', !!checkedRadio);
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
    checkbox.parentNode.classList.toggle('disabled', isDisabled);
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
  for (var i = 0; i < selectorsList.length; i++) {
    var selector = selectorsList[i];
    selector.checked = filters.indexOf(selector.value) > -1;
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
  var selectedOsValue = selectedOs.dataset.text || selectedOs.value;
  document.getElementById('selectedOs').textContent = selectedOsValue;
}

function updateWalletMatchCount() {
  var matchCount = document.querySelectorAll('.wallet-link.visible').length;
  var matchCountElement = document.getElementById('walletMatchCount');

  if (matchCountElement) matchCountElement.textContent = matchCount;
}

function updateActiveFilterCount(filters) {
  var countElements = document.querySelectorAll('.js-wallet-filter-active-count');
  var activeCount = filters.filter(function(filter) {
    return filter !== '';
  }).length;

  for (var i = 0; i < countElements.length; i++) {
    countElements[i].textContent = activeCount;
    countElements[i].hidden = activeCount === 0;
  }
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

    if (input.type === 'radio') {
      var groupInputs = document.getElementsByName(input.name);
      var groupValues = [];

      for (var groupIndex = 0; groupIndex < groupInputs.length; groupIndex++) {
        groupValues.push(groupInputs[groupIndex].value);
      }

      filtersList = filtersList.filter(function(filter) {
        return groupValues.indexOf(filter) === -1;
      });
    }

    if (filtersList.indexOf(input.value) === -1) filtersList.push(input.value);
    
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
    
    if (!matchedWallets.length && input.name !== 'platform' && !input.checked) {
      input.disabled = true;
      input.parentNode.classList.add('disabled');
    } else {
      input.disabled = false;
      input.parentNode.classList.remove('disabled');
    }
  }

}

function displayRelevantSelectorContent() {
  var filters = queryStringToArray();

  highlightCheckedSelectorInputs(filters);
  setWalletsVisibility(filters);
  updateWalletMatchCount();
  updateActiveFilterCount(filters);
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

function getFilterInput(filter) {
  var filterInputs = document.querySelectorAll('#sidebarSelector .js-wallet-selector');

  for (var i = 0; i < filterInputs.length; i++) {
    if (filterInputs[i].value === filter) return filterInputs[i];
  }

  return null;
}

function getFilterLabel(filter) {
  var filterInput = getFilterInput(filter);
  var label = filterInput && filterInput.parentNode.querySelector('.checkbox-text');

  return label ? label.textContent.replace(/^\s+|\s+$/g, '') : '';
}

function renderCheckboxesHTML(filters, position) {
  filters = filters.split(',');

  position.innerHTML = '';
  filters.forEach(function(filter) {
    var filterLabel = getFilterLabel(filter);
    if (!filterLabel) return;

    var selectedFilter = document.createElement('div');
    var selectedFilterText = document.createElement('p');
    var removeButton = document.createElement('button');
    var removeIcon = document.createElement('img');

    selectedFilter.className = 'checkboxes-acc-selected';
    selectedFilterText.className = 'checkboxes-acc-selected-text';
    selectedFilterText.textContent = filterLabel;

    removeButton.type = 'button';
    removeButton.className = 'checkboxes-acc-selected-remove';
    removeButton.dataset.checkboxRemove = filter;
    removeButton.setAttribute('aria-label', filterLabel);

    removeIcon.src = '/img/icons/close-btn.svg';
    removeIcon.alt = '';

    removeButton.appendChild(removeIcon);
    selectedFilter.appendChild(selectedFilterText);
    selectedFilter.appendChild(removeButton);
    position.appendChild(selectedFilter);
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
      removeCheckboxFilter(this.dataset.checkboxRemove);
      sortTableColumn('control');
    });
  }
  
}

function checkUserInputsActivity(selectedPlatform) {
  setWalletsVisibility([selectedPlatform, 'beginner']);
  var wallets = document.querySelectorAll('.wallet-link.visible');
  var separatorText = document.querySelector('.helper-user-separator');
  if (!wallets.length) {
    if (getUrlParameter('user') !== 'experienced') setUrlParameter('user', 'experienced');
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
  updateProgressIndicator(getUrlParameter('step'));
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

    history.replaceState(null, null, url);
  }
}

function onWalletSelectorInputChange(input) {
  var selectedInputs = document.querySelectorAll('.js-wallet-selector[name="' + input.name + '"]:checked');
  var filters = collectCheckedInputsValues(selectedInputs);

  if (input.name === 'platform') {
    history.pushState(
      null,
      null,
      window.location.pathname + '?step=5&platform=' + encodeURIComponent(input.value)
    );
  } else setUrlParameter(input.name, filters);
  
  displayRelevantSelectorContent();
}

function setSidebarVisibility(isOpen, shouldMoveFocus) {
  if (!sidebarMediaQuery.matches) {
    sidebarOpenButton.classList.remove('visible');
    sidebarSelector.classList.remove('hidden');
    walletSelectorScreen.classList.remove('filters-open');
    sidebarOpenButton.setAttribute('aria-expanded', 'true');
    sidebarSelector.removeAttribute('role');
    sidebarSelector.removeAttribute('aria-modal');
    sidebarSelector.removeAttribute('aria-labelledby');
    document.body.classList.remove('wallet-filters-open');
    return;
  }

  sidebarOpenButton.classList.toggle('visible', !isOpen);
  sidebarSelector.classList.toggle('hidden', !isOpen);
  walletSelectorScreen.classList.toggle('filters-open', isOpen);
  sidebarOpenButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('wallet-filters-open', isOpen);

  if (isOpen) {
    sidebarSelector.setAttribute('role', 'dialog');
    sidebarSelector.setAttribute('aria-modal', 'true');
    sidebarSelector.setAttribute('aria-labelledby', 'sidebarSelectorTitle');
  } else {
    sidebarSelector.removeAttribute('role');
    sidebarSelector.removeAttribute('aria-modal');
    sidebarSelector.removeAttribute('aria-labelledby');
  }

  if (!isOpen) closeTooltips();

  if (shouldMoveFocus && isOpen) document.getElementById('sidebarCloseButton').focus();
  else if (shouldMoveFocus && !isOpen) sidebarOpenButton.focus();
}

function toggleSidebarVisibility() {
  setSidebarVisibility(sidebarSelector.classList.contains('hidden'), true);
}

function syncSidebarVisibility() {
  setSidebarVisibility(!sidebarMediaQuery.matches, false);
}

function keepFocusInSidebar(event) {
  if (event.key !== 'Tab' || !walletSelectorScreen.classList.contains('filters-open')) return;

  var candidates = Array.prototype.slice.call(sidebarSelector.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex="0"]'));
  var focusable = candidates.filter(function(element) {
    return element.offsetParent !== null;
  });

  if (!focusable.length) return;

  var firstElement = focusable[0];
  var lastElement = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function removeCheckboxFilter(filterValue) {
  var filter = getFilterInput(filterValue);
  if (!filter) return;
  filter.checked = false;
  onWalletSelectorInputChange(filter);
}

function setupButtonTypes() {
  var buttons = walletFinderPage.querySelectorAll('button:not([type])');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('type', 'button');
  }
}

function closeTooltips(exceptTrigger) {
  var tooltipTriggers = walletFinderPage.querySelectorAll('.tooltip-trigger.is-open');

  for (var i = 0; i < tooltipTriggers.length; i++) {
    if (tooltipTriggers[i] !== exceptTrigger) {
      tooltipTriggers[i].classList.remove('is-open');
      tooltipTriggers[i].setAttribute('aria-expanded', 'false');
    }
  }
}

function getTooltipLabel(trigger, tooltip) {
  var container = trigger.parentNode;

  for (var i = 0; i < 4 && container; i++) {
    var label = container.querySelector('.sidebar-selector-label, .checkbox-text, .user-radio-text');
    if (label) return label.textContent.replace(/^\s+|\s+$/g, '');
    container = container.parentNode;
  }

  return tooltip.textContent.replace(/^\s+|\s+$/g, '');
}

function setupAccessibleTooltips() {
  var tooltipTriggers = walletFinderPage.querySelectorAll('.tooltip-trigger');

  for (var i = 0; i < tooltipTriggers.length; i++) {
    (function(trigger, index) {
      var tooltip = trigger.querySelector('.tooltip');
      if (!tooltip) return;

      var tooltipId = 'walletTooltip' + index;
      tooltip.id = tooltipId;
      tooltip.setAttribute('role', 'tooltip');
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-label', getTooltipLabel(trigger, tooltip));
      trigger.setAttribute('aria-describedby', tooltipId);
      trigger.setAttribute('aria-expanded', 'false');

      var triggerImage = trigger.querySelector('img');
      if (triggerImage) triggerImage.setAttribute('alt', '');

      trigger.addEventListener('click', function(event) {
        var willOpen = !trigger.classList.contains('is-open');
        closeTooltips(trigger);
        trigger.classList.toggle('is-open', willOpen);
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        event.stopPropagation();
      });

      trigger.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          trigger.click();
        } else if (event.key === 'Escape') {
          trigger.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }(tooltipTriggers[i], i));
  }

  document.addEventListener('click', function() {
    closeTooltips();
  });
}

function updateDisclosureState(button, disclosure) {
  button.setAttribute('aria-expanded', disclosure.classList.contains('open') ? 'true' : 'false');
}

function setListeners() {
  var navigationButtons = Array.prototype.slice.call(document.querySelectorAll('.js-helper-nav-btn'));
  navigationButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      onNavigationButtonClick(button);
    });
  });

  var progressButtons = Array.prototype.slice.call(document.querySelectorAll('.js-progress-nav'));
  progressButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      if (!button.disabled) onNavigationButtonClick(button);
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
  sidebarScrim.addEventListener('click', function() {
    setSidebarVisibility(false, true);
  });
  
  var filtersAccordionButtons = Array.prototype.slice.call(document.querySelectorAll('.checkboxes-acc-btn'));
  filtersAccordionButtons.forEach(function(button) {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function(e) {
      var disclosure = button.parentNode.parentNode;
      disclosure.classList.toggle('open');
      updateDisclosureState(button, disclosure);
    });
  });
  
  var accordionButtons = Array.prototype.slice.call(document.querySelectorAll('.acc-btn'));
  accordionButtons.forEach(function(button) {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function() {
      this.parentNode.classList.toggle('open');
      updateDisclosureState(this, this.parentNode);
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

  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && walletSelectorScreen.classList.contains('filters-open')) {
      setSidebarVisibility(false, true);
    } else keepFocusInSidebar(event);
  });

  if (sidebarMediaQuery.addEventListener) {
    sidebarMediaQuery.addEventListener('change', syncSidebarVisibility);
  } else {
    sidebarMediaQuery.addListener(syncSidebarVisibility);
  }
}

function checkOldUrls() {
  var pathnameElements = window.location.pathname.split('/').filter(function(part) {
    return part !== '';
  });
  
  for (var i = 0; i < platformSelectors.length; i++) {
    var platform = platformSelectors[i].value;
    
    if (pathnameElements.indexOf(platform) > -1) {
      replaceUrlParameter('platform', platform);
      replaceUrlParameter('step', 5);
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
  setupButtonTypes();
  setupAccessibleTooltips();
  shuffleWalletRows();
  checkOldUrls();
  displayRelevantContent();
  setListeners();
  syncSidebarVisibility();
}
init();

}());
