import { templates } from '../templates/_templateController.js';
import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';

const termsAndConditionsPage = {
	display: function(){

		modal.display('Terms And Conditions', templates.getHtml('termsAndConditions'), { 'name': 'Close'});

		return this;
	},
	addEventListeners(){
		$('.forward').on('click', function() {
	        message.post('hideModal');
	    });
	}
}

export { termsAndConditionsPage };