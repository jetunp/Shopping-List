//Selectors
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

//initialize app
function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click',onClickItem);
    clearBtn.addEventListener('click',clearItems);
    filter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded',displayItems);
    
    //run this function when the page loads to reset filterItems and ClearAll elements.
    resetUI();
}

//display the items stored to local storage
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    resetUI();
}

//Add items to the list (DOM Only)
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem =itemInput.value;
    //input empty validation
    if(newItem === '') {
        alert('Please add an item');
        return;
    }
    
    //create item DOM element
    addItemToDOM(newItem);

    //add item to local storage
    addItemToLocalStorage(newItem);

    resetUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    //create list item
    const listItem = document.createElement('li');
    //create text node
    const text = document.createTextNode(item);
    //insert text node in the element
    listItem.appendChild(text);

    //add button
    const button = createButton('remove-item btn-link text-black');
    listItem.appendChild(button);
    
    //add whole (li) element to the dom
    itemList.appendChild(listItem);
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

//Add Items to local storage
function addItemToLocalStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    //Add new item to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(item) {
    let itemsFromStorage;

    //check if any items in local storage
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if(e.target.parentNode.classList.contains('remove-item') && confirm('Are you sure?')) {
        removeItem(e.target.parentNode.parentNode);
    }
}

//Delete the items by clicking X buttons
function removeItem(item) {
    //remove the item from the DOM
    item.remove();

    //remove the item from the local storage
    removeItemFromStorage(item.textContent);
    resetUI();
}

//remove the item from the storage when removed from DOM
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    
    //filter out the items to be removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    //reset to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

//Clear all the items when clearAll button clicked
function clearItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from local storage
    localStorage.removeItem('items');
    
    resetUI();
}

//filter the items using matching patterns
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    Array.from(items).forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display ='flex';
        } else {
            item.style.display ='none';
        }
    });
}

//on load of the page check if there are any items, if not we dynamically not show filterItems and ClearAll.
function resetUI(e) {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

init();