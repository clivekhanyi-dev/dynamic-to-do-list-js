// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to store tasks in memory
    let tasks = [];

    // Function to add a task to the to-do list
    // taskText: text of the task
    // save: whether to save this task to Local Storage (true by default)
    function addTask(taskText, save = true) {

        // If no taskText passed in, read from the input field
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            // Only alert when user is adding via input, not when loading from storage
            if (save) {
                alert("Please enter a task!");
            }
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";

        // Use classList.add as required
        removeBtn.classList.add('remove-btn');

        // Remove the task when clicked (from DOM + Local Storage)
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
            }

            // Update Local Storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Append remove button to li, then li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If save is true, store this task in the tasks array and Local Storage
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Clear the input field after adding
            taskInput.value = "";
        }
    }

    // Function to load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // keep array in sync

        // For each stored task, create its DOM element without re-saving
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' = don't save again
    }

    // Add event listener for clicking the Add button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add event listener for pressing Enter inside the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
