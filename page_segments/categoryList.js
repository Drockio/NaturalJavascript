import { storage } from '../js/crud.js'
import { templates } from '../templates/_templateController.js';
import { productList } from './productList.js';
import { product_categories } from '../js/product_categories.js';

const categoryList = {
	display: function(){
		const masterCategories = storage.getMasterCategoryArray();
		
		let categoryMarkup = masterCategories.map(item => templates.getHTML_categories({categoryName: item}));
		
		//display results
		$('.category-list').empty().append(categoryMarkup);

		return this;
	},
	addEventListeners: function(){
		$('.category').on('click', function(){
			product_categories.updateCategoryElement(this.closest('[data-categoryName]'));

			// get currently enabled categories
			let categoryChildren = Array.from(this.closest('.category-list').children);
			let enabledCategories = product_categories.getEnabledCategories(categoryChildren);

			// get products filtered by category
			let filteredProducts = product_categories.filterProductByCategory(enabledCategories);

			productList.display(filteredProducts);
		});
	}
}

export { categoryList };