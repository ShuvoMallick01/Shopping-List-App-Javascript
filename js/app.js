const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterItems = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

let isEditMode = false;

// === FORM TO INPUT ITEM ===
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

  // Check for Edit Mode
  if (isEditMode == true) {
    const itemToEdit = itemList.querySelector(".editMode");

    removeItemFormStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("editMode");
    console.log(itemToEdit);
    itemToEdit.remove();
    isEditMode = false;
  }

  // if (isEditMode == false) {
  //   formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  //   formBtn.style.backgroundColor = "#fd390e";
  //   isEditMode = false;
  // }

  // Add Item to DOM
  addItemtoDOM(newItem);

  // Add item to local Storage
  addItemtoStorage(newItem);

  checkUI();
  itemInput.value = "";
});

// === ADD ITEM TO DOM ===
function addItemtoDOM(item) {
  // Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

// === CREATE BUTTON ===
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-x");
  button.appendChild(icon);
  return button;
}

// === CREATE ICON ===
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// === ADD ITEM TO STORAGE ===
function addItemtoStorage(item) {
  const itemFromStorage = getItemsFromStorage();
  // Add new item to array
  itemFromStorage.push(item);
  // Convert to JSOn string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

// === GET ITEM FORM STORAGE ===
function getItemsFromStorage() {
  let itemFromStorage;

  if (localStorage.getItem("items") == null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}

// === REMOVE ITEM FROM DOM ===
itemList.addEventListener("click", (e) => {
  if (e.target.parentElement.className.includes("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
});

// === REMOVE ITEM FROM STORAGE ===
function removeItemFormStorage(item) {
  let itemFormStorage = getItemsFromStorage();
  // Filter out item to be removed
  itemFormStorage = itemFormStorage.filter((i) => i != item);
  // Reset to localstorage
  localStorage.setItem("items", JSON.stringify(itemFormStorage));
}

// === VALIDATE REMOVE ITEM ===
function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove Item From DOM
    item.remove();
    // Remove Item From Storage
    removeItemFormStorage(item.textContent);
    checkUI();
  }
}

// === EDIT ITEM ===
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("editMode"));

  item.classList.add("editMode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
  // console.log(item.textContent);

  // checkUI();
}

// === CLEAR ITEMS ===
clearBtn.addEventListener("click", (e) => {
  while (itemList.firstChild) {
    // Remove items from DOM
    itemList.removeChild(itemList.firstChild);
  }
  // Remove items from Local Storage
  localStorage.clear("items");

  checkUI();
});

// === CHECK UI ===
function checkUI() {
  // itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filterItems.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterItems.style.display = "block";
    clearBtn.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#fd390e";

  // isEditMode = false;
}

// === FILTER ITEM ===
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

// === DOM CONTENT LOADED ===
document.addEventListener("DOMContentLoaded", (e) => {
  const getItemFormStorage = getItemsFromStorage();
  getItemFormStorage.forEach((item) => addItemtoDOM(item));

  checkUI();
});

// CALL FUNCTIONS
checkUI();
