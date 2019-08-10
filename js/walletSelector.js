var linksList = document.querySelectorAll('.wallet-link');  
var selectorsList = document.querySelectorAll('.js-wallet-selector');
var sidebarOpenButton = document.getElementById('sidebarOpenButton');
var sidebarSelector = document.getElementById('sidebarSelector');

function queryStringToArray() {            
  var categories = ['platform', 'user', 'important', 'features'];
  var result = [];
  var pairs = location.search.slice(1).split('&');
  
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    if (pair[1] && categories.includes(pair[0])) result = result.concat(pair[1].split(','));
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
    if (!categories.includes(filter) && filter !== '') return false;
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
  tableCells.forEach(function(cell) {
    if (cell.dataset.cell === selectedOption) {
      cell.classList.remove('hidden');
    } else cell.classList.add('hidden');
  });
}

function displayRelevantScreen(relevantScreenName) {
  var screens = document.querySelectorAll('[data-screen-name]');
  screens.forEach(function(screen) {
    if (screen.dataset.screenName ===  relevantScreenName) screen.classList.add('visible');
    else screen.classList.remove('visible');
  });
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
  
  inputsList.forEach(function(input) {
    if (filters.includes(input.value)) input.checked = true;
    else input.checked = false;
  });
}

function displayRelevantWizardContent(selectedStep) {    
  var accordionsList = document.querySelectorAll('.js-helper-accordion');
  accordionsList.forEach(function(accordion) {
    var accordionType = accordion.dataset.type;
    var accordionStep = accordion.dataset.number;
    var selectedFilters = getUrlParameter(accordionType);
    
    openRelevantStepAccordion(selectedStep, accordionStep, accordion);
    highlightCompletedHeader(selectedFilters, selectedStep, accordionStep, accordion);
    displaySelectedHeaderValues(accordionType, selectedFilters, accordion);
  });
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
  
  nextButtonsList.forEach(function(button) {
    var radioType = button.dataset.buttonType;
    var checkedRadio = document.querySelector('.js-helper-radio[name="' + radioType + '"]:checked');
    if (checkedRadio) button.classList.add('visible');
  });
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
  checkboxes.forEach(function(checkbox) {
    checkbox.disabled = isDisabled;
  });
}

function checkIfPlatformSelected(filters) {
  var platforms = [];
  var platfomrSelectors = document.querySelectorAll('.platform-radio');
  platfomrSelectors.forEach(function(selector) {
    platforms.push(selector.value);
  });
  for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    if (filters.includes(platform)) return true;
  }
  return false;
}

function highlightCheckedSelectorInputs(filters) {
  if (checkIfPlatformSelected(filters)) {  
    selectorsList.forEach(function(selector) {
      if (filters.includes(selector.value)) selector.checked = true;
      else selector.checked = false;
    });
    disableInputs(false);
  } else disableInputs(true);
}

function setWalletsVisibility(filters) {
  linksList.forEach(function(link) {
    var categories = link.dataset.categories.split(' ');

    if (checkIfFiltersInclude(categories, filters) && checkIfPlatformSelected(filters)) link.classList.add('visible');
    else link.classList.remove('visible');
  });
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
  sectionsList.forEach(function(section) {
    if (section.dataset.sectionName ===  relevantSectionName) section.classList.add('visible');
    else section.classList.remove('visible');
  });
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

function displayRelevantSelectorContent() {
  var filters = queryStringToArray();

  highlightCheckedSelectorInputs(filters);
  setWalletsVisibility(filters);
  displayRelevantSelectortSection(filters);
  displaySelectedCheckbox();
}

function checkParametersValues(parameterName, parameterValues) {
  var filters = parameterValues.split(',');
  var inputValues = [];
  var inputsList = document.getElementsByName(parameterName);
  inputsList.forEach(function(input) {
    inputValues.push(input.value);
  });
  
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    if (!inputValues.includes(filter)) return false;
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
  discoverBoxLinks.forEach(function(linksList) {
    if (linksList.dataset.linksStep === currentStep) linksList.classList.add('visible');
    else linksList.classList.remove('visible');
  });
}

function displayRelevantContent() {
  var step = getUrlParameter('step');
  var currentStep = Number(step);
  var isWizardStep = currentStep > 0 && currentStep < 5;
  var isSelectorStep = currentStep === 5;
  if (isWizardStep && verifyPreviousStepsChecks(step)) {
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
  
function collectCheckedInputsValues(selectedInputs) {
  var selectedInputsValues = [];
  selectedInputs.forEach(function(selectedInput) {
    selectedInputsValues.push(selectedInput.value);
  });
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
  removeCheckboxFilterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      removeCheckboxFilter(button.dataset.checkboxRemove);
      sortTableColumn('control');
    });
  });
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
  
  inputsList.forEach(function(input) {
    var filters = queryStringToArray();
    filters.push(input.value);
    setWalletsVisibility(filters);
    var wallets = document.querySelectorAll('.wallet-link.visible');
    if (!wallets.length && input.name !== 'platform') input.disabled = true;
    else input.disabled = false;
  });
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
  
  displayNextButton(radioName);
  scrollToNextButton(radioName);
}

function onWizardCheckboxChange(checkbox) {
  var selectedCheckboxes = document.querySelectorAll('.js-helper-checkbox[name="' + checkbox.name + '"]:checked');
  var filters = collectCheckedInputsValues(selectedCheckboxes);
  setUrlParameter(checkbox.name, filters);
}

function onWalletSelectorInputChange(input) {
  var selectedInputs = document.querySelectorAll('.js-wallet-selector[name="' + input.name + '"]:checked');
  var filters = collectCheckedInputsValues(selectedInputs);
  setUrlParameter(input.name, filters);
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

function setListners() {
  var navigationButtons = document.querySelectorAll('.js-helper-nav-btn');
  navigationButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      onNavigationButtonClick(button);
    });
  });

  var wizardRadioList = document.querySelectorAll('.js-helper-radio');
  wizardRadioList.forEach(function(radio) {
    radio.addEventListener('change', function() {
      onWizardRadioChange(radio);
      checkInputsActivity();
    });
  });

  var wizardCheckboxesList = document.querySelectorAll('.js-helper-checkbox');
  wizardCheckboxesList.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      onWizardCheckboxChange(checkbox);
      checkInputsActivity();
    });
  });

  var skipButtons = document.querySelectorAll('.js-skip-btn');
  skipButtons.forEach(function(button) {
    button.addEventListener('click', onSkipButtonClick);
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
  
  var filtersAccordionButtons = document.querySelectorAll('.checkboxes-acc-btn');
  filtersAccordionButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      button.parentNode.parentNode.classList.toggle('open');
    });
  });
  
  var accordionButtons = document.querySelectorAll('.acc-btn');
  accordionButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      this.parentNode.classList.toggle('open');
    });
  });
  
  var tableSortButtons = document.querySelectorAll('.table-sort-btn');
  tableSortButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      sortTableColumn(button.dataset.sort);
    });
  });
  
  window.addEventListener('popstate', function() {
    displayRelevantContent();
  });
}

function init() {
  displayRelevantContent();
  setListners();
}
init();