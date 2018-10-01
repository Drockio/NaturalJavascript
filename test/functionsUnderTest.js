const locale = require('../js/locale.js').locale;

const functions = [
	{'locale.getStateSelectList': locale.getStateSelectList},
	{'locale.getCountriesSelectList': locale.getCountriesSelectList}
];

export { functions };