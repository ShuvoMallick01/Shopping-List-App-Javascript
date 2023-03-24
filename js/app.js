const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterItem = document.getElementById("filter");

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

  // Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);

  checkUI();
  itemInput.value = "";
});

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

// REMOVE ITEM
itemList.addEventListener("click", (e) => {
  // console.log(e.target.parentElement.classList.contains("remove-item"));
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
});

// CLEAR ITEMS
clearBtn.addEventListener("click", (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
});

// CHECK UI
function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filterItem.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterItem.style.display = "block";
    clearBtn.style.display = "block";
  }
}

checkUI();
