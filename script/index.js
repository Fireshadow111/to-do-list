let taskInput = document.getElementById("new-task"); 
let addButton = document.getElementsByTagName("button")[0]; 
let incompleteTaskHolder = document.getElementById("incomplete-tasks"); 
let completedTasksHolder = document.getElementById("completed-tasks"); 

const saveTasksToLocalStorage = () => {
    const incompleteTasks = [];
    const completedTasks = [];

    for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
        incompleteTasks.push(incompleteTaskHolder.children[i].querySelector("label").innerText);
    }

    for (let i = 0; i < completedTasksHolder.children.length; i++) {
        completedTasks.push(completedTasksHolder.children[i].querySelector("label").innerText);
    }

    localStorage.setItem("incompleteTasks", JSON.stringify(incompleteTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

const loadTasksFromLocalStorage = () => {
    const incompleteTasks = JSON.parse(localStorage.getItem("incompleteTasks")) || [];
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    for (let task of incompleteTasks) {
        let listItem = createNewTaskElement(task);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    for (let task of completedTasks) {
        let listItem = createNewTaskElement(task);
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }
}


let createNewTaskElement = function(taskString) {
    let listItem = document.createElement("li");

    let checkBox = document.createElement("input"); 
    let label = document.createElement("label"); 
    let editInput = document.createElement("input"); 
    let editButton = document.createElement("button"); 
    let deleteButton = document.createElement("button"); 

    label.innerText = taskString;

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit"; 
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


let addTask = function() {
    console.log("Add Task...");
    let listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";

    saveTasksToLocalStorage();
}


let editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem = this.parentNode;

    let editInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode");

    saveTasksToLocalStorage();
}


let deleteTask = function() {
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    saveTasksToLocalStorage();
}


let taskCompleted = function() {
    console.log("Complete Task...");

    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

    saveTasksToLocalStorage();
}

let taskIncomplete = function() {
    console.log("Incomplete Task...");

    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    saveTasksToLocalStorage();
}


let ajaxRequest = function() {
    console.log("AJAX Request");
}


addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");

    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}


loadTasksFromLocalStorage();
