function toggleClass(elem,className){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
  }
  return elem;
}

function toggleMenuDisplay(e){
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.menu');

  toggleClass(menu,'hide');
}

function handleOptionSelected(e){
  toggleClass(e.target.parentNode, 'hide');			

  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('.dropdown .title');
  const icon = document.querySelector('.dropdown .title');


  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
}

// function handleTitleChange(){
//   const result = document.getElementById('result');
// }

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

//document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);

