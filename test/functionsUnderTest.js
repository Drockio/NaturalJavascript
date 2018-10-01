const locale = require('../js/locale.js').locale;

const functions = [
	{'locale.getStateSelectList': locale.getStateSelectList},
	{'locale.getCountriesSelectList': locale.getCountriesSelectList},
	{'locale.setStatesSelectList': locale.setStatesSelectList},
	{'locale.getCountryBlob': locale.getCountryBlob}
];

export { functions };