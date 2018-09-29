import { urls, globals } from '../js/config.js';
import { message } from '../js/message.js';
import { util } from '../js/util.js';
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
		shoppingCart.campaignid = globals.campaignId;
		let productsInCart = templates.getHTML_products(shoppingCart);
		let shipToChoiceContainer = templates.getHtml('shipToAddressChoice', (storage.getGeneric('standardInputs')));
		let checkoutFormTemplate = templates.getHtml('importUserForm', ({'title': 'Alternate Shipping Information', 'formName': 'altShipping', 'includeEmail': 'true'}));
		let creditCardMarkup = templates.getHtml('creditCardPage', ({productsInCart: productsInCart, shipToChoiceContainer: shipToChoiceContainer, "checkoutForm": checkoutFormTemplate}));
		let continueButton = {'name': 'Place Order', 'attributes': [{'type': 'submit'}]};
		let standardInputs = storage.getGeneric('standardInputs');
		let countryCode = standardInputs['countryCode'] || globals.defaultCountryCode;
		let state = standardInputs['state'];

		modal.display('Checkout', creditCardMarkup, continueButton, { 'name': 'Back'});
		creditCardPage.displayTotal();
		this.attachMonths();
		this.attachYears();

		//alt shipping address
		//$('#country').append(locale.getCountriesSelectList(countryCode));
		//$('#state').append(locale.getStateSelectList(countryCode, state));

	  	$('#country').on('change', function(){
			locale.setStatesSelectList($('#country :selected').val(), $('#state'), $('#lblState'));
		});

		$('.navigation.backward').click(function(){
			message.post('displayImportUserPage');
		});
		$('button[type="submit"]').on('click', function(){
			creditCardPage.submit();
		});
		$('button[name="edit"]').on('click', function(){
			message.post('displayImportUserPage');
		});
		$('input[name="billShipSame').on('click', creditCardPage.toggleBillShipSame);
		util.scrollTopModal();
		//this.mockData();
	},
	displayTotal: function(){
		$(shoppingCart.displayTotalTarget).text(shoppingCart.getTotal());
	},
	mockData: function(){
		//TODO Set validation for credit cards
		util.setUIById('cardNumber_id', '5346131158777180');
		util.setUIById('firstName_id', 'spanky mc');
		util.setUIById('lastName_id', 'spankerson');
		util.setUIById('cardSecurityCode_id', '5577');
		util.setUIById('first-name', 'anotherPerson');
		util.setUIById('last-name', 'theirLastName');
		util.setUIById('address', '2nd best house');
		util.setUIById('apartment-suite', 'B apartment');
		util.setUIById('city', 'star prairie');
		util.setUIById('country', 'CA'); //TODO check to see if you use two letter country and state codes
		util.setUIById('state', 'MN');
		util.setUIById('zip', '54020');
		util.setUIById('phone', '555-1212');
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
		//make ajax call
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
				ccData = $.extend(ccData, this.getAltShippingInputs());
			}

			//name, address, email phone, campaignId
			let standardInputs = $.extend(ccData, storage.getGeneric('standardInputs'));

			//TODO QA this to make sure it works
			//orderId, etc retrieved from Konnektive
			let registrationInfo = $.extend(standardInputs, this.getRegistrationSpecific());

			//credit card number, etc..
			let creditCardInfo = $.extend(registrationInfo, this.getCreditCardPaySource());

			//format products that get sent on URL
			let productsUrlSegement = this.mapProducts();

			let api_url = this.getUrl(productsUrlSegement);

			this.post(ccData, api_url);
		}
	},
	billShipSameDisplay: function(action){
		let display = 'none';
		if (action === 'show'){
			display = 'flex';
		}
		$('#checkoutFormContainer').css('display', display);
	},
	toggleBillShipSame: function(){
		let display = $(this).val() === "true" ? false : true;
		$('#checkoutFormContainer').toggle(display);
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
		let monthList = util.getListOfMonths();
		$('#cardMonth_id').append(monthList);
	},
	attachYears: function(){
		let yearList = util.getNextXYears(12);
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