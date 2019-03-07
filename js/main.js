//TODO:
//- css separation
//- checkin
//- finish js cleanup
//- checkin
//- filtering of products - LINQ like
//- checkin
//- investigate country/local behavior
//- checkin
//- push to drockio remote if you haven't been paid.
//- investigate server side git. Right now there is a server.js and api/server.js, we don't need two.
//- home page segment loader dd$('.footer', 'templateName')
//- interfaces for talking to controllers - decide where mapping for non-konnektive goes
//- go through and do a test on broadcast errors on each page. put html into a template
//- add shroud between each page
//- cool thank you page
//- Hook importUserPage.postStandardInputs back up
//- Remove references to TAKETHISOUT - it sets a standard price. 
//- Use campaign 1 or 6 to display "NO products available"
//- Use campaign 4,9 to work on some alignment issues.
//- Node css plugin to check for unclosed or poorly formatted css? html?

// original git setup:
// origin	https://github.com/LevelAds/Greens.git (fetch)
// origin	https://github.com/LevelAds/Greens.git (push)

import { globals } from './config.js';
import { validate } from './validation.js';
import { storage } from './crud.js';
import { locale } from './locale.js';
import { util } from './util.js';
import { dd$ } from './extensions.js'; 
import { applicationLoad } from '../applications/_applications.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from '../page_segments/shoppingCartPage.js';
import { importUserPage } from '../page_segments/importUserPage.js';
import { creditCardPage } from '../page_segments/creditCardPage.js';
import { thankYouPage } from '../page_segments/thankYouPage.js';
import { termsAndConditionsPage } from '../page_segments/termsAndConditionsPage.js';

//main load function
window.onload=function(){
	//future admin option
	//let setup = util.getUrlParameter('setup');

	applicationLoad.chooser(globals.defaultApplication);
};

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    console.log("Wrapper error occured: " + errorMsg);
    return false;
};

window.addEventListener("error", function (e) {
   console.log("Wrapper error occurred: " + e.error.message);
   return false;
});



