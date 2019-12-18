import { templates } from '../templates/_templateController.js';
import { message } from '../js/message.js';
import { dd$ } from '../js/extensions.js';

const modal = {

	display: function(attributes){
		//[parameter] attributes: title, backButtonText || null, forwardButtonText || null

		//remove main body scrool
		$('body').addClass('removeScroll');

		//get html. 
		let modalMarkup = templates.getHtml('modal', attributes);

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
	setAttributes: function(title, backButton, forwardButton){
		//set up attributes for modal template
		let attributes = {};

		//this could potentially use a re-write, it is mostly for safety.
		attributes.forwardButton = forwardButton ? 
			`<button class="forward navigation">${forwardButton}</button>` : '';
		attributes.backButton = backButton ? 
			`<button class="backward navigation">${backButton}</button>` : '';
		attributes.title = title;

		return attributes;
	},
	//usually triggered by hideModal from main.js
	hide: function(){
		$('#main-modal').css('display', 'none');
		$('body').removeClass('removeScroll');
	}
};

export { modal };