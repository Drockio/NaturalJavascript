// original git setup:
// origin	https://github.com/LevelAds/Greens.git (fetch)
// origin	https://github.com/LevelAds/Greens.git (push)

import { globals } from './config.js';
import { validate } from './validation.js';
import { storage } from './crud.js';
import { locale } from './locale.js';
import { util } from './util.js';
import { dd$ } from './extensions.js'; 
import { applications, applicationLoad } from '../applications/_applications.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from '../page_segments/shoppingCartPage.js';
import { importUserPage } from '../page_segments/importUserPage.js';
import { creditCardPage } from '../page_segments/creditCardPage.js';
import { thankYouPage } from '../page_segments/thankYouPage.js';
import { termsAndConditionsPage } from '../page_segments/termsAndConditionsPage.js';

//main load function
window.onload=function(){
	//TODO: future admin toggle with 'setup' as url "trigger"
	//let setup = util.getUrlParameter('setup');


	//TODO: set up getDropDownList like this:
	//dd$('#appChooserDDL').getDropDownList(applications);

	//generic application loader
	//only loads one application at a time
	applicationLoad.chooser(globals.defaultApplication);
	
	//get html for ddl for all applications 
	let applicationDropDown = dd$('#appChooserDDL').setDropDownList('appChoiceDDL', applications, globals.defaultApplication);

	dd$('#appChoiceDDL').on('change', function(){
		let selected = dd$('#appChoiceDDL').getDropDownValue();
		
		if (selected){
			applicationLoad.chooser(selected);
		}
	});

	//let applicationDropDown = dropDownList.createHtml(applications);
	
	//use html via jquery
	//$('#appChooserDDL').html(applicationDropDown);
	//TODO: cleanup this loadm => update to dd$ local and make append inside getDropDownList(...)
};

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    console.log("Wrapper error occured: " + errorMsg);
    return false;
};

window.addEventListener("error", function (e) {
   console.log("Wrapper error occurred: " + e.error.message);
   return false;
});



