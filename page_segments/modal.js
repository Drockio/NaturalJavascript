import { templates } from '../templates/_templateController.js';
import { message } from '../js/message.js';
import { dd$ } from '../js/extensions.js';

const modal = {
	//display: function(title, pageHTML, forwardButtonJSON, backButtonJSON) {
	display: function(){
		//remove main body scrool
		$('body').addClass('removeScroll');

		//get content
		let modalMarkup = templates.getHtml('modal');

		//add content
		$('.modal-content').empty().append(modalMarkup);

		//show modal
	    $('#main-modal').css('display', 'block');

	    return this;
	},
	addEventListeners: function(){
	    dd$('.close').on('click', function() {
	        message.post('hideModal');
	    });
	},
	updateModal: function(attributes){
		dd$('.modalTitle').text(attributes.title);
	},
	// getAttributes: function(title, pageHTML, forwardButtonJSON, backButtonJSON){
	// 	//set up attributes for modal template
	// 	let attributes = {};

	// 	//this could potentially use a re-write, it is mostly for safety.
	// 	attributes.forwardAttributes = (forwardButtonJSON && forwardButtonJSON.attributes) ? modal.extractAttributes(forwardButtonJSON.attributes) : null;
	// 	attributes.backwardAttributes = (backButtonJSON && backButtonJSON.attributes) ? modal.extractAttributes(backButtonJSON.attributes) : null;
	// 	attributes.forwardButton = (forwardButtonJSON && forwardButtonJSON.name) ? 
	// 		`<button class="forward navigation" ${attributes.forwardAttributes || ''}>${forwardButtonJSON.name}</button>` : '';
	// 	attributes.backButton = (backButtonJSON && backButtonJSON.name) ? 
	// 		`<button class="backward navigation" ${attributes.backwardAttributes || ""}>${backButtonJSON.name}</button>` : '';
	// 	attributes.title = title;
	// 	attributes.html = pageHTML;

	// 	return attributes;
	// },
	//usually triggered by hideModal from main.js
	hide: function(){
		$('#main-modal').css('display', 'none');
		$('body').removeClass('removeScroll');
	},
	extractAttributes: function(jData){
		if (jData){
			let accumulator = '';
			jData.map(item => {
				Object.entries(item).forEach(([key, value]) => {
					accumulator += (`${key}="${value}" `);
				});
			});
			return accumulator;
		}
	}
};

export { modal };