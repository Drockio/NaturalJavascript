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
	filter: function(category, state){
		//categoryArray = storage.getMasterCategoryArray();
	},
	updateCategoryElement(categoryElement){
		let categoryState = categoryElement.dataset.lit;
		let newCategoryState = categoryState === 'true' ? 'false' : 'true';
		categoryElement.dataset.lit = newCategoryState;
	},
	getEnabledCategories(category_list){
		let enabledCategories = [];
		category_list.forEach(item => {
			if (item.dataset.lit === "true"){
				enabledCategories.push(item.dataset.categoryname);
			}
		});
		return enabledCategories;
	},
	filterProductByCategory(enabledCategories){
		let filteredProducts = [];

		// filter products based on categories
		let products = storage.getProducts();

		products.forEach(product => {
			if (product.categories){
				enabledCategories.some(category => {
					if (product.categories.includes(category)){
						filteredProducts.push(product);
						return true;
					}
				});
			}
		});

		return filteredProducts;
	}
};

export { product_categories };
