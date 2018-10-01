const assert = require('assert');
const expect = require('chai').expect;
const chalk = require('chalk');
const functions = require('./functionsUnderTest.js').functions;

const util = require('../js/util.js').util;
const locale = require('../js/locale.js').locale;
const divider = '\n  ====================';

function functionExistsAndNoExcecption(fnName, fn){
	it(chalk.green(fnName + ' is an existing function without exceptions.'), function(){
	 	expect(fn).to.not.throw();
	 	expect(fn).to.be.a('function');
	})
};

function runTestSuite(){
	describe(`Functions Under Test ${divider}`, function(){
		functions.forEach(item => {
			let entry = Object.entries(item)[0];
			functionExistsAndNoExcecption(entry[0], entry[1]);
		});
	});
}

function runCurrentTest(){
	describe(`Locale Functions${divider}`, function(){
		describe('US Test', function(){
			it('returns an array of length 50', function(){
				//let stateSelectList = locale.getStatesSelectList('US');
				//expect(stateSelectList).to.be.an('array').to.have.lengthOf(50);

				let countryBlob = locale.getCountryBlob('CA');
				let stateList = countryBlob.locales;
				//console.log('statelist typeof: ' + typeof stateList);
				expect(stateList).to.be.an('array').to.have.lengthOf(13);
				expect(countryBlob['locale-label']).to.be.an('string');
				//console.log(countryBlob);
			})
		});
	});
}


runTestSuite();
//runCurrentTest();
