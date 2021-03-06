import { urls } from '../interfaces/_interfaceConfig.js';
import { message } from '../js/message.js';
import { util } from '../js/util.js';
import { time } from '../js/time.js';
import { dd$ } from '../js/extensions.js';
import { storage } from '../js/crud.js';
import { locale } from '../js/locale.js';
import { validate } from '../js/validation.js';
import { templates } from '../templates/_templateController.js';
import { modal } from '../page_segments/modal.js';
import { shoppingCartPage } from '../page_segments/shoppingCartPage.js';
import { shoppingCart } from '../js/shoppingCart.js';

const creditCardPage = {
	display: function() {
		let shoppingCart = storage.getCart();
		let productsInCart = templates.getHTML_products(shoppingCart);
		let shipToChoiceContainer = templates.getHtml('checkout/shipToAddressChoice', (storage.getGeneric('standardInputs')));
		let checkoutFormTemplate = templates.getHtml('checkout/importUserForm', ({'title': 'Alternate Shipping Information', 'formName': 'altShipping', 'includeEmail': 'true'}));
		let creditCardMarkup = templates.getHtml('checkout/creditCardPage', ({productsInCart: productsInCart, shipToChoiceContainer: shipToChoiceContainer, "checkoutForm": checkoutFormTemplate}));
		let continueButton = {'name': 'Place Order', 'attributes': [{'type': 'submit'}]};

		modal
			.display('Checkout', creditCardMarkup, continueButton, { 'name': 'Back'})
			.addEventListeners();
		creditCardPage.displayTotal();
		creditCardPage.attachMonths();
		creditCardPage.attachYears();

		return this;
	},
	addEventListeners(){
		dd$('#country').on('change', function(){
			locale.setStatesSelectList($('#country :selected').val(), $('#state'), $('#lblState'));
		});

		dd$('.navigation.backward').on('click', function(){
			message.post('displayImportUserPage');
		});
		dd$('button[type="submit"]').on('click', function(){
			creditCardPage.submit();
		});
		dd$('button[name="edit"]').on('click', function(){
			message.post('displayImportUserPage');
		});
		dd$('input[name="billShipSame').on('click', creditCardPage.toggleBillShipSame);
		util.scrollTopModal();
	},
	toggleBillShipSame: function(){
		let display = $(this).val() === "true" ? false : true;
		$('#checkoutFormContainer').toggle(display);
	},
	displayTotal: function(){
		dd$(shoppingCart.displayTotalTarget).setText(shoppingCart.getTotal());
	},
	getUrl: function(productsUrlSegement){
		return urls.importOrder + productsUrlSegement;
	},
	determineSuccess: function(data){
		let jsonResult = JSON.parse(data);
		if (jsonResult && jsonResult['result'] === 'ERROR'){
			broadcast.error(data);
			return false;
		}
		else
		{
			broadcast.message(data);
			return true;
		}
	},
	post: function(ccData, url){
		message.post('displayShroud');
		let results = $.ajax({
			type: "POST",
			url: url,
			data: ccData,
		})
		.done(function(response){
			message.post('hideShroud');
			if (creditCardPage.determineSuccess(response))
			{
				message.post('thankYouPage');
			}
		})
		.fail(function(response){
			message.post('hideShroud');
			broadcast.error(response);
		});
	},
	mapProducts: function(){
		//example output: &product1_id=256&product1_qty=3&product2_id=152&product2_qty=1
		let shoppingCart = storage.getCart();
		let accumulator = '';
		for (let i = 1; i < shoppingCart.length + 1; i += 1){
			accumulator += `&product${i}_id=${shoppingCart[i-1].productId}&product${i}_qty=${shoppingCart[i-1].quantity}`;
		} 
		return accumulator;
	},
	submit: function(){
		let billingShipSame = util.getRadio('billShipSame') === 'true' ? true : false;
		
		let billingShipValidated = !billingShipSame ? validate.validateForm('altShipping-form') : true;
		let ccValidated = validate.validateForm('creditCard');
		if (billingShipValidated && ccValidated){

			let binaryBillingShipSame = billingShipSame ? '1' : '0';
			let addShipData = billingShipSame === 'false' ? true : false;
			let ccData = {
				'paySource': 'CREDITCARD',
				'billingShipSame': binaryBillingShipSame
			};
			//if (!binaryBillingShipSame)  {ccData = $.extend(ccData, {'billingShipSame': binaryBillingShipSame})}
			if (addShipData){
				ccData = $.extend(ccData, creditCardPage.getAltShippingInputs());
			}

			//name, address, email phone, campaignId
			let standardInputs = $.extend(ccData, storage.getGeneric('standardInputs'));

			//TODO QA this to make sure it works
			//orderId, etc retrieved from Konnektive
			let registrationInfo = $.extend(standardInputs, creditCardPage.getRegistrationSpecific());

			//credit card number, etc..
			let creditCardInfo = $.extend(registrationInfo, creditCardPage.getCreditCardPaySource());

			//format products that get sent on URL
			let productsUrlSegement = creditCardPage.mapProducts();

			let api_url = creditCardPage.getUrl(productsUrlSegement);

			creditCardPage.post(ccData, api_url);
		}
	},
	billShipSameDisplay: function(action){
		let display = 'none';
		if (action === 'show'){
			display = 'flex';
		}
		$('#checkoutFormContainer').css('display', display);
	},
	getAltShippingInputs: function(){
		let altShippingInputs = {
			"shipFirstName": util.selectByName("firstName"),
			"shipLastName": util.selectByName("lastName"),
			"shipAddress1": util.selectByName("address1"),
			"shipAddress2": util.selectByName("address2"),
			"shipCity": util.selectByName("city"),
			"shipState": util.selectByName("state"), //view link for state
			"shipPostalCode": util.selectByName("postalCode"),		
			"shipCountry": util.selectByName("country")
			};
		storage.setGeneric('altShippingInputs', altShippingInputs);
		return altShippingInputs;
	},
	attachMonths: function(){
		let monthList = time.getListOfMonths();
		$('#cardMonth_id').append(monthList);
	},
	attachYears: function(){
		let yearList = time.getNextXYears(12);
		$('#cardYear_id').append(yearList);
	},
	getPaySource: function(paysource){
		switch(paysource.toUpperCase()){
			case 'CHECK':
				return 'CHECK';
			case 'DIRECTDEBIT':
				return 'DIRECTDEBIT';
			case 'CREDITCARD':
				return 'CREDITCARD';
			default:
				return 'ERROR_CONDITION';
		}
	},
	setRegistrationSpecific: function(jsonData){
		let registrationSpecific = {
			"result": jsonData.result,
			"agentUserId": jsonData.message.agentUserId,
			"customerId": jsonData.message.customerId,
			"orderId": jsonData.message.orderId
		};
		storage.setGeneric('registrationSpecific', registrationSpecific);
	},
	getRegistrationSpecific: function(){
		let registrationSpecific = storage.getGeneric('registrationSpecific');
	},
	//don't store this!!!!
	getCreditCardPaySource: function(){
		let creditCardPaySource = {
			"cardNumber": util.selectByName('cardNumber'),
			"cardMonth": util.selectByName('cardMonth'),
			"cardYear": util.selectByName('cardYear'),
			"cardSecurityCode": util.selectByName('cardSecurityCode')
		};
		return creditCardPaySource;
	}
};

export { creditCardPage };