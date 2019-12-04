import { message } from '../js/message.js';
import { interfaceConfig } from '../interfaces/_interfaceConfig.js';
import { greenSiteController } from './greenSiteController.js';
import { visualsController } from './visualsController.js';
import { vic20Controller } from './vic20Controller.js';

const applications = [
	{	'greens': 'greens' },
	{ 	'visuals': 'visuals' },
	{	'vic20': 'vic20' }

	//future applications
	//{ 'satellite': 'satellite'},
	//{	'guitar': 'guitar' },
	//{	'sandbox': 'sandbox' }
	
];

const applicationLoad = {
	chooser: function(application){
		switch (application){
			case 'visuals':
				applicationLoad.visualSandbox();
				break;
			case 'greens':
				applicationLoad.greensSite();
				break;
			case 'vic20':
				applicationLoad.vic20();
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
	},
	vic20: function(){
		vic20Controller.registerPageDisplayListeners();
		message.post('displayInterface');
	},
	sandbox: function(){
		sandboxController.registerPageDisplayListeners();
		message.post('displayInterface');
	}
};

export { applications, applicationLoad };