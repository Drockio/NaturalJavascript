import { storage } from './crud.js';

const product_categories = {
	gatherAndSave: function(products){
		let uniqueCategories = [];
		products.forEach((product, iterator) => {
			if (product.categories){
				product.categories.forEach(item => {
					if (!uniqueCategories.includes(item)){
						uniqueCategories.push(item);
					}
				});
			}
		});

		storage.setMasterCategoryArray(uniqueCategories);
	},
	update: function(category, state){
		categoryArray = storage.getMasterCategoryArray();
	}
};

export { product_categories };
