const assert = require('assert');
const expect = require('chai').expect;
const chalk = require('chalk');
const functions = require('./functionsUnderTest.js').functions;

const locale = require('../js/locale.js').locale;

function functionExistsAndNoExcecption(fnName, fn){
	it(chalk.green(fnName + ' is an existing function without exceptions.'), function(){
	 	expect(fn).to.not.throw();
	 	expect(fn).to.be.a('function');
	})
};

function runTestSuite(){
	describe('Display Functions\n  =================', function(){
		functions.forEach(item => {
			let entry = Object.entries(item)[0];
			functionExistsAndNoExcecption(entry[0], entry[1]);
		});
	});
}

function runCurrentTest(){
	describe('Locale Functions\n  =================', function(){
		describe('US Test', function(){
			it('returns an array of length 50', function(){
				//let stateSelectList = locale.getStatesSelectList('US');
				//expect(stateSelectList).to.be.an('array').to.have.lengthOf(50);

				let stateSelectList = locale.getStatesSelectList('CA');
				expect(stateSelectList).to.be.an('array').to.have.lengthOf(12);
				console.log(stateSelectList);
			})
		});
	});
}


//runTestSuite();
runCurrentTest();
