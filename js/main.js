//TODO: sessionStorage or sessionStorage? 
//Use campaign 1 or 6 to display "NO products available"
//Use campaign 4,9 to work on some alignment issues.

//productId
//productName
//productDescription
//productImagePath
//campaignId
//price
//shippingPrice
//currencySymbol 
import { urls, globals } from '../js/config.js';
import { message } from './message.js';
import { validate } from './validation.js';
import { storage } from './crud.js';
import { locale } from './locale.js';
import { util } from './util.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { homePage } from '../page_segments/homePage.js';
import { product_list } from '../page_segments/product_list.js';
import { shoppingCartPage } from '../page_segments/shoppingCart.js';
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
	registerPageListeners: function(){
		message.listen('displayHomePage', function(){homePage.display();});
		message.listen('displayCart', function(){shoppingCartPage.display();});
		message.listen('displayImportUserPage', function(){importUserPage.display();});
		message.listen('displayCreditCardPage', function(){creditCardPage.display();});
		message.listen('displayProducts', function(){product_list.load();});
		message.listen('thankYouPage', function(){thankYouPage.success();});
	},

	registerDisplayListeners: function(){
		message.listen('displayShroud', function(){ util.enableShroud(); });
		message.listen('hideShroud', function(){ util.disableShroud(); });
		message.listen('scrollToTop', function(){util.scrollToTop();});
	},

	registerInteractionListeners: function() {
		$('#shopping-cart-click').click(function(){
	    	message.post('displayCart');
	  	});

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
  		
  		controller.registerPageListeners();
  		controller.registerDisplayListeners();
  		controller.registerInteractionListeners();

  		message.post('displayHomePage');
  		message.post('displayProducts');

  		//message.post('displayImportUserPage');
	});
};



