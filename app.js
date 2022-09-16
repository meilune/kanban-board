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

//Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

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
    const arrayNames = ["backlog", "progress", "complete", "onHold"];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    })
}

getSavedColumns();
updateSavedColumns();
