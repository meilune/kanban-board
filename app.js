const addBtns = document.querySelectorAll(".add-btn");
const saveBtns = document.querySelectorAll(".save-btn");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-new-item");

//Item Lists
const listColumns = document.querySelectorAll(".kanban-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

//Items
let updatedOnLoad = false;

//Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

const arrayNames = ["backlog", "progress", "complete", "onHold"];

//Drag Functionality
let draggedItem;
let currentColumn;

//Local Storage functionality. Get if available, set if not available
function getSavedColumns() {
    if(localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ["Read a book", "Train spanish for 15min"];
        progressListArray = ["Complete development project", "Finish watching the drama", "Plant flowers"];
        completeListArray = ["Drink coffee", "Exercise for 20min"];
        onHoldListArray = ["Return items", "Fill in the questionnaire"];
    }
}

//Set local storage Arrays
function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    })
}

//Filter Arrays to remove empty items
function filterArray(array) {
    const filteredArray = array.filter(item => item !== "");
    return filteredArray;
}

//Creating the DOM elements
function createDOMEl(columnEl, column, items, index) {
    const item = document.createElement("li");
    item.classList.add("item");
    item.textContent = items;
    item.draggable = true;
    item.setAttribute("ondragstart", "drag(event)");
    item.contentEditable = true;
    item.id = index;
    item.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
    columnEl.appendChild(item);
}

//Update the DOM
function updateDOM() {
    if(!updatedOnLoad) {
        getSavedColumns();
    };

    //Backlog Lists
    backlogList.textContent = "";
    backlogListArray.forEach((list, index) => {
        createDOMEl(backlogList, 0, list, index);
    });
    backlogListArray = filterArray(backlogListArray);

    //Progress Lists
    progressList.textContent = "";
    progressListArray.forEach((list, index) => {
        createDOMEl(progressList, 1, list, index);
    });
    progressListArray = filterArray(progressListArray);
    //Completed Lists
    completeList.textContent = "";
    completeListArray.forEach((list, index) => {
        createDOMEl(completeList, 2, list, index);
    });
    completeListArray = filterArray(completeListArray);
    //On Hold Lists
    onHoldList.textContent = "";
    onHoldListArray.forEach((list, index) => {
        createDOMEl(onHoldList, 3, list, index);
    });
    onHoldListArray = filterArray(onHoldListArray);

    updatedOnLoad = true;
    updateSavedColumns();
}

//Update Item - Delete if neccesary or update Array value
function updateItem(index, column) {
    const selectedArray = listArrays[column];
    const selectedItem = listColumns[column].children;
    if(!selectedItem[index].textContent) {
        delete selectedArray[index];
    } else {
        selectedArray[index] = selectedItem[index].textContent;
    }
    // rebuildArrays();
    updateDOM();
}

//Allow arrays to reflect Drag and Drop items
function rebuildArrays() {
    backlogListArray = [];
    for (let i = 0; i < backlogList.children.length; i++) {
        backlogListArray.push(backlogList.children[i].textContent);
    }
    progressListArray = [];
    for (let i = 0; i < progressList.children.length; i++) {
        progressListArray.push(progressList.children[i].textContent);
    }
    completeListArray = [];
    for (let i = 0; i < completeList.children.length; i++) {
        completeListArray.push(completeList.children[i].textContent);
    }
    onHoldListArray = [];
    for (let i = 0; i < onHoldList.children.length; i++) {
        onHoldListArray.push(onHoldList.children[i].textContent);
    }
    updateDOM();
}

//Function to drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}
//Save information of the picked item
function drag(ev) {
    draggedItem = ev.target;
}

//Add style to columns for visual difference and save that information
function dragEnter(column) {
    //Add styles for the move
    listColumns[column].classList.add("over");
    //Set the column information:
    currentColumn = column;
}
//Drop the item functionality 
function drop(ev) {
    ev.preventDefault();
    //Remove background color
    listColumns.forEach((column) => {
        column.classList.remove("over");
    });
    //Add item to column
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArrays();
}

//Function to show DOM of input
function addNewItem(i) {
    addItemContainers[i].hidden = false;
    saveBtns[i].hidden = false;
    addBtns[i].hidden = true;
}

//Saving the information
function saveLists(i) {
    if(addItems[i].innerHTML) {
        const itemInnerText = addItems[i].innerHTML;
        const selectedArray = listArrays[i];
        selectedArray.push(itemInnerText);
        addItems[i].innerHTML = "";
        updateDOM();
    } else {
        alert("Please fill in the text before saving");
    }
}

//Function to hide input DOM and save the information
function saveNewItem(i) {
    addItemContainers[i].hidden = true;
    saveBtns[i].hidden = true;
    addBtns[i].hidden = false;
    saveLists(i);
}

//Event listener for enter key to prevent creating new elements
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

//On load
updateDOM();
