//TODO:
//- home page segment loader dd$('.footer', 'templateName')
//- investigate country/local behavior
//- go through and do a test on broadcast errors on each page. put html into a template
//- add shroud between each page
//- cool thank you page
//- Hook importUserPage.postStandardInputs back up
//- Remove references to TAKETHISOUT - it sets a standard price. 
//- Use campaign 1 or 6 to display "NO products available"
//- Use campaign 4,9 to work on some alignment issues.

import { urls, globals } from '../js/config.js';
import { message } from './message.js';
import { validate } from './validation.js';
import { storage } from './crud.js';
import { locale } from './locale.js';
import { util } from './util.js'; 
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { homePage } from '../page_segments/homePage.js';
import { products } from '../page_segments/products.js';
import { shoppingCartPage } from '../page_segments/shoppingCartPage.js';
import { importUserPage } from '../page_segments/importUserPage.js';
import { creditCardPage } from '../page_segments/creditCardPage.js';
import { thankYouPage } from '../page_segments/thankYouPage.js';

const broadcast = {
	error: function(data){
		let jsonData = typeof(data) === 'string' ? JSON.parse(data) : data;
		if (jsonData){

			// let errors = Object.entries(jsonData['message']).map(([key, value]) => {
			// 	return `<span>${key} ${value}. </span>`; }
			// ).join(''); //join removes unwanted commas. darn commas!
			let html = `<div class="error"><h3>${jsonData['result']}</h3>${jsonData['message']}</div>`;
			$('.modal-message').html(html);

			storage.setError(data);
			util.scrollTopModal();
		}
	},
	message: function(data){
		console.log(data);
		//joyous day!
		//TODO: put loading message on thank you page until this is received.
		storage.setMessage(data);
		util.scrollTopModal();
	}
};

const controller = {

	//display pages here.
	registerPageDisplayListeners: function(){
		//setup home page
		message.listen('displayHomePage', function(){ homePage.display(); });

		//add products
		message.listen('displayProducts', function(){ products.display(); });

		//setup shoppingcart page 
		message.listen('displayShoppingCartPage', function(){ shoppingCartPage
																	.display() 
																	.addEventListeners(); });
		//setup import user page
		message.listen('displayImportUserPage', function(){ importUserPage
																	.display()
																	.addEventListeners(); });
		//setup credit card purchase page
		message.listen('displayCreditCardPage', function(){ creditCardPage.display(); });

		//setup thank you page
		message.listen('thankYouPage', function(){ thankYouPage.display(); });
	},

	//listen for page events
	registerDisplayEventListeners: function(){
		//shroud disables user input during transitions
		message.listen('displayShroud', function(){ util.enableShroud(); });
		message.listen('hideShroud', function(){ util.disableShroud(); });

		//scroll to top of page and hide modal
		message.listen('scrollToTop', function(){ util.scrollToTop(); });
		message.listen('hideModal', function(){ modal.hide(); });
	},

	//set scrolling behavior.
	registerInteractionListeners: function() {
		//handle shopping cart click
		$('#shopping-cart-click').on('click', function(){
	    	message.post('displayShoppingCartPage');
	  	});

		//first parameter is where a click occurs and second is
		//where page scrolls to.
	  	util.registerScroll('#click-home', '.container');
	  	util.registerScroll('#click-about', '.about');
	  	util.registerScroll('#click-products', '.products');
	  	util.registerScroll('#click-contact', '.email');
	  	util.registerScroll('.click-top', '.container');
	}
};

//main load function
window.onload=function(){
  	$(document).ready(function(){
  		//future admin option
  		//let setup = util.getUrlParameter('setup');
  		
  		//set up the listeners defined above
  		controller.registerPageDisplayListeners();
  		controller.registerDisplayEventListeners();
  		controller.registerInteractionListeners();

  		//initial page loads
  		message.post('displayHomePage');
  		message.post('displayProducts');

  		//display any page you want to work on here:
  		//message.post('displayImportUserPage');
	});
};



