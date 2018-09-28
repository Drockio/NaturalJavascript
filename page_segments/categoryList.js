import { storage } from '../js/crud.js'
import { templates } from '../templates/_templateController.js';
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
			//NEW IDEA: Let's just get all the categories & states and then extract the products from that.


			let categoryElement = this.closest('[data-categoryName]');
			let categoryChanged = categoryElement.dataset['categoryname'];
			let categoryState = categoryElement.dataset['lit'];
			if (categoryElement && categoryChanged && categoryState){
				let newCategoryState = categoryState === 'true' ? 'false' : 'true';
				product_categories.update(categoryChange, newCategoryState);
			}
			debugger;
			//locale.setStatesSelectList($('#country :selected').val(), $('#state'), $('#lblState'));
		});
	}

}

export { categoryList };