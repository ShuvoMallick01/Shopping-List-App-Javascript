const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterItems = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

let isEditMode = false;

// MAIN FUNCTION
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  } else {
    console.log("Success!");
  }

  // Add Item to DOM
  addItemtoDOM(newItem);

  // Add item to local Storage
  addItemtoStorage(newItem);

  checkUI();
  itemInput.value = "";
});

// ADD ITEM TO DOM
function addItemtoDOM(item) {
  // Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

// CREATE BUTTON
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-x");
  button.appendChild(icon);
  return button;
}

// CREATE ICON
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// ADD ITEM TO STORAGE
function addItemtoStorage(item) {
  const itemFromStorage = getItemsFromStorage();

  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

// GET ITEM FORM STORAGE
function getItemsFromStorage() {
  let itemFromStorage;
  // console.log(localStorage.getItem("items") == null);
  if (localStorage.getItem("items") == null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}

// REMOVE ITEM
function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove Item From DOM
    item.remove();
    // Remove Item From Storage
    removeItemFormStorage(item.textContent);
  }
  checkUI();
}

// REMOVE ITEM FROM DOM
itemList.addEventListener("click", (e) => {
  if (e.target.parentElement.className.includes("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
  checkUI();
});

// REMOVE ITEM FROM STORAGE
function removeItemFormStorage(item) {
  let itemFormStorage = getItemsFromStorage();
  itemFormStorage = itemFormStorage.filter((i) => i != item);
  localStorage.setItem("items", JSON.stringify(itemFormStorage));
}

// EDIT ITEM
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("editMode"));

  item.classList.add("editMode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

// CLEAR ITEMS
clearBtn.addEventListener("click", (e) => {
  while (itemList.firstChild) {
    // Remove items from DOM
    itemList.removeChild(itemList.firstChild);
  }

  // Remove items from Local Storage
  localStorage.clear("items");

  checkUI();
});

// CHECK UI
function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filterItems.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterItems.style.display = "block";
    clearBtn.style.display = "block";
  }
}

// FILTER ITEM
filterItems.addEventListener("input", (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value;

  items.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", (e) => {
  const getItemFormStorage = getItemsFromStorage();
  getItemFormStorage.forEach((item) => addItemtoDOM(item));

  checkUI();
});

// CALL FUNCTIONS
checkUI();
