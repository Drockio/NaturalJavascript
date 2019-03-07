import { message } from '../js/message.js';
import { interfaceConfig } from '../interfaces/_interfaceConfig.js';
import { greenSiteController } from './greenSiteController.js';
import { visualsController } from './visualsController.js';

const applicationLoad = {
	chooser: function(application){
		switch (application){
			// enable/disable visuals application:
			case 'visuals':
				applicationLoad.visualSandbox();
				break;
			// enable/disable greensite application:
			case 'greens':
				applicationLoad.greensSite();
				break;
		}
	},
	greensSite: function(){
		//set up interface urls, globally accessable via urls.xxxxx
		//check interfaces/_interfaceConfig.js for more details.
		interfaceConfig.chooseInterfaceUrls();

		//set up the listeners defined above
		greenSiteController.registerPageDisplayListeners();

		//initial page loads
		message.post('displayHomePage');
		message.post('retrieveAndDisplayProducts');
		message.post('displayCategories');

		greenSiteController.registerDisplayEventListeners();

		//message.post('displayCreditCardPage');

	}, 
	visualSandbox: function(){
		visualsController.registerPageDisplayListeners();
		message.post('displayVisuals');
	}
};

export { applicationLoad };