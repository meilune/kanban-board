const addBtns = document.querySelectorAll(".add-btn");
const saveBtns = document.querySelectorAll(".save-btn");
const addContainer = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-new-item");

//Lists
const itemLists = document.querySelectorAll(".kanban-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

//Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];