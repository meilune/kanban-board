const addBtns = document.querySelectorAll(".add-btn");
const saveBtns = document.querySelectorAll(".save-btn");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-new-item");

//Item Lists
const itemLists = document.querySelectorAll(".kanban-item-list");
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

//Local Storage functionality. Get if available, set if not available
function getSavedColumns() {
    if(localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ["Read a book", "Train spanish for 15min"];
        progressListArray = ["Complete development project", "Finish watching the drama"];
        completeListArray = ["Drink coffee", "Exercise for 20min"];
        onHoldListArray = ["Return items", "Fill in the questionnaire"];
    }
}

//Set local storage Arrays
function updateSavedColumns() {
    // localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
    // localStorage.setItem("progressItems", JSON.stringify(progressListArray));    localStorage.setItem("completeItems", JSON.stringify(completeListArray));    localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    })
}

updateSavedColumns();

//Update the DOM
function updateDOM() {
    //Check local Storage once
    if(!updatedOnLoad) {
        getSavedColumns();
    }
    //Backlog Lists
    backlogList.textContent = "";
    backlogListArray.forEach((list) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.textContent = list;
        backlogList.appendChild(item);
    })
    //Progress Lists
    progressListArray.forEach((list) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.textContent = list;
        progressList.appendChild(item);
    })
    //Completed Lists
    completeListArray.forEach((list) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.textContent = list;
        completeList.appendChild(item);
    })
    //On Hold Lists
    onHoldListArray.forEach((list) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.textContent = list;
        onHoldList.appendChild(item);
    })
}


updateDOM();
// function fillInDOM() {
    
// }