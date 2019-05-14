import { message } from '../js/message.js';
import { modal } from '../page_segments/modal.js';
import { homePage } from '../page_segments/homePage.js';
import { productList } from '../page_segments/productList.js';
import { categoryList } from '../page_segments/categoryList.js';
import { shoppingCartPage } from '../page_segments/shoppingCartPage.js';

const greenSiteController = {

	//display pages here.
	registerPageDisplayListeners: function(){
		//setup home page
		message.listen('displayHomePage', function(){ homePage
																.display()
																.addEventListeners(); });

		// retrieveAndDisplay products
		message.listen('retrieveAndDisplayProducts', function(){ productList
																.retrieveAndDisplay(); });

		//add products
		message.listen('displayProducts', function(){ productList
																.display(); });
		//add categories
		message.listen('displayCategories', function(){ categoryList
																.display()
																.addEventListeners(); });
		//setup shoppingcart page 
		message.listen('displayShoppingCartPage', function(){ shoppingCartPage
																.display() 
																.addEventListeners(); });
		//setup import user page
		message.listen('displayImportUserPage', function(){ importUserPage
																.display()
																.addEventListeners(); });
		//setup credit card purchase page
		message.listen('displayCreditCardPage', function(){ creditCardPage
																.display()
																.addEventListeners(); });
		//setup thank you page
		message.listen('thankYouPage', function(){ thankYouPage.display(); });

		// set up terms and conditions page
		message.listen('displayTermsAndConditionsPage', function(){ termsAndConditionsPage
																.display()
																.addEventListeners(); });
	    message.listen('updateModal', function(attributes){
	    	modal.updateModal(attributes);
	    	modal.addEventListeners();
	    });
	},

	//listen for page events
	registerDisplayEventListeners: function(){
		//shroud disables user input during transitions
		message.listen('displayShroud', function(){ util.enableShroud(); });
		message.listen('hideShroud', function(){ util.disableShroud(); });

		//scroll to top of page and hide modal
		message.listen('scrollToTop', function(){ util.scrollToTop(); });
		message.listen('hideModal', function(){ modal.hide(); });
	}
};

export { greenSiteController };