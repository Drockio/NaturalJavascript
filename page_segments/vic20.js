import { templates } from '../templates/_templateController.js';
import { dd$ } from '../js/extensions.js';

const vic20 = {
    display: function(){
        dd$('.container').setTemplate('vic20');
    }
};

export { vic20 };