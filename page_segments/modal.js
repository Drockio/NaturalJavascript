import { templates } from '../templates/_templateController.js';

const modal = {
	display: function(title, markup, forwardButtonJSON, backButtonJSON) {
			let attributes = {};
			attributes.forwardAttributes = (forwardButtonJSON && forwardButtonJSON.attributes) ? this.extractAttributes(forwardButtonJSON.attributes) : null;
			attributes.backwardAttributes = (backButtonJSON && backButtonJSON.attributes) ? this.extractAttributes(backButtonJSON.attributes) : null;
			attributes.forwardButton = (forwardButtonJSON && forwardButtonJSON.name) ? 
				`<button class="forward navigation" ${attributes.forwardAttributes || ''}>${forwardButtonJSON.name}</button>` : '';
			attributes.backButton = (backButtonJSON && backButtonJSON.name) ? 
				`<button class="backward navigation" ${attributes.backwardAttributes || ""}>${backButtonJSON.name}</button>` : '';
			attributes.title = title;
			attributes.markup = markup;

			let modalMarkup = templates.getModal(attributes);

			//TODO: Set these up as an event
			$('.modal-content').empty().append(modalMarkup);
			// modal close
		    $('.close').click(function() {
		        $('#main-modal').css('display', 'none');
		        $('body').removeClass('removeScroll');
		    });
		    $('#main-modal').css('display', 'block');
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