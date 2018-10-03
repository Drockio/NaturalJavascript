import { templates } from '../templates/_templateController.js';
import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';
import { dd$ } from '../js/extensions.js';

const termsAndConditionsPage = {
	display: function(){

		modal
			.display('Terms And Conditions', templates.getHtml('termsAndConditions'), { 'name': 'Close'})
			.addEventListeners();

		return this;
	},
	addEventListeners(){
		$('.forward').on('click', function() {
	        message.post('hideModal');
	    });
	}
}

export { termsAndConditionsPage };