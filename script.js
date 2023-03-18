//Selectors
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

//Event Listeners
itemForm.addEventListener('submit', addItem);
//itemInput.addEventListener('keydown',onEnter);

//Add items to the list (DOM Only)
function addItem(e) {
    e.preventDefault();
    const newItem =itemInput.value;
    //input empty validation
    if(newItem === '') {
        alert('Please add an item');
        return;
    }
    
    //create list item
    const listItem = document.createElement('li');
    //create text node
    const text = document.createTextNode(newItem);
    //insert text node in the element
    listItem.appendChild(text);

    //add button
    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    
    //add whole element to the dom
    itemList.appendChild(listItem);

    itemInput.value = '';
}

//Create button for the new added items
function createButton(classes) {
    const button = document.createElement('button');
    //add classes
    button.className = classes;
    //add icon
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//create the icon for the button for newly added items
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


