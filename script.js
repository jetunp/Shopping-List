//Selectors
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',clearItems);
filter.addEventListener('input',filterItems);


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
    const button = createButton('remove-item btn-link text-black');
    listItem.appendChild(button);
    
    //add whole (li) element to the dom
    itemList.appendChild(listItem);

    resetUI();

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

//Delete the items by clicking X buttons
function removeItem(e) {
    if(e.target.parentNode.classList.contains('remove-item') && confirm('Are you sure?')) {
        e.target.parentNode.parentNode.remove();
    }
    resetUI();
}

//Clear all the items when clearAll button clicked
function clearItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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

//run this function when the page loads to reset filterItems and ClearAll elements.
resetUI();