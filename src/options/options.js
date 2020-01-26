/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

/**
 * Get the options elements and apply values to Chrome storage.
 * When complete, display a saved message.
 */
function saveOptions() {
  const skin = document.getElementById('skin').value || 'light';
  const delay = parseInt(document.getElementById('delay').value, 10) || 500;
  let merriamWebsterDictionary = document.getElementById('dictionaryKey').value;
  if (!merriamWebsterDictionary) merriamWebsterDictionary = false;
  const maxTextCount = parseInt(document.getElementById('maxTextCount').value, 10) || 3;

  chrome.storage.sync.set({
    skin,
    delay,
    merriamWebsterDictionary,
    maxTextCount
  }, function(res) {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

/**
 * Restores select options states using the preferences
 * stored in chrome.storage.
 */
function restoreOptions() {
  chrome.storage.sync.get([
    'skin',
    'delay',
    'merriamWebsterDictionary',
    'maxTextCount'
  ], function(items) {
    document.getElementById('skin').value = items.skin || 'light';
    document.getElementById('delay').value = items.delay || 500;
    document.getElementById('dictionaryKey').value = items.merriamWebsterDictionary || '';
    document.getElementById('maxTextCount').value = items.maxTextCount || 3;
  });
}
