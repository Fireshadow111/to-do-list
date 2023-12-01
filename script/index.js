// Referencing the html elements
let input = document.getElementById('input');
let addButton = document.getElementById('add');
let sortButton = document.getElementById('sort');
let itemsList = document.getElementById('items');

// Array 
let tasksArray = [];

function toDo() {
    // Validation for input values
    let item = input.value.trim();
    item = item.charAt(0).toUpperCase() + item.slice(1);

    if (!item || item.length <= 3) {
        alert('Invalid input');
        return;
    }

    // Creating an object called "task"
    let task = {
        id: tasksArray.length === 0 ? 1 : tasksArray.length + 1,
        name: item,
        createdDate: new Date(),
        completed: false
    };

    // Adding to the array and updating display
    tasksArray.push(task);
    updateItemsList();
    input.value = '';
}

function updateItemsList() {
    itemsList.innerHTML = '';

    // Iterating through the array and updating the list
    tasksArray.forEach(task => {
        let listItem = document.createElement('li');
        listItem.textContent = task.name;

        // Creating close button
        let closeButton = document.createElement('button');
        closeButton.textContent = 'X';

        // Event listener to remove task when button is clicked
        closeButton.addEventListener('click', function () {
            removeTask(task.id);
        });

        listItem.appendChild(closeButton);
        itemsList.appendChild(listItem);
    });
}

function removeTask(taskId) {

    // Filter out task with the specified ID
    tasksArray = tasksArray.filter(task => task.id !== taskId);
    updateItemsList();
}

// Sorting tasks alphabetically
function sortTasks() {
    tasksArray.sort((a, b) => a.name.localeCompare(b.name));
    updateItemsList();
}
addButton.addEventListener('click', toDo);
sortButton.addEventListener('click', sortTasks);