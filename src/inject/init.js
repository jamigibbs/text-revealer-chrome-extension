/* eslint-disable no-undef */

(function(){
	/**
	 * Initiate the script.
	 */
	let myTextRevealer = new TextRevealer({
		wikipedia: true,
		merriamWebsterDictionary: false,
		delay: 500,
		scrollIntoView: true
	});
	myTextRevealer.init();

	/**
	 * Apply any previously saved options to the text revealer instance.
	 */
	chrome.storage.sync.get([
		'skin',
		'delay',
		'merriamWebsterDictionary',
		'maxTextCount'
	], function(items) {
		myTextRevealer.options.merriamWebsterDictionary = items.merriamWebsterDictionary || false
		myTextRevealer.options.delay = items.delay || 500;
		myTextRevealer.options.skin = items.skin || 'light';
		myTextRevealer.options.maxTextCount = items.maxTextCount || 3;
	});

	/**
	 * Update the instance with new options from the extension settings.
	 * changes = { newValue: 'newExample', oldValue: 'oldExample }
	 */
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		for (let key in changes) {
			myTextRevealer.options[key] = changes[key].newValue;
		}
	});
})()
