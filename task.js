const title = document.getElementById('title');
const task = document.getElementById('task');
const confrimTask = document.getElementById('confirmTask');
const taskList = document.getElementById('taskList');

let taskListItems = [];

function loadTasksFromStorage() {
    chrome.storage.sync.get('tasks', function(data) {
        if (data.tasks) {
            taskListItems = data.tasks;
            updateTaskList();
        }
    });
}

function saveTasksToStorage() {
    chrome.storage.sync.set({ 'tasks': taskListItems });
}

// Load tasks when open/reopen extension
loadTasksFromStorage();

confrimTask.addEventListener('click', () => {
    console.log('Button clicked');
    const taskValue = task.value;

    if (taskValue.trim() !== '') {
        taskListItems.push(taskValue);
        task.value = '';
        updateTaskList();

        // Save tasks to Chrome storage when a new task is added
        saveTasksToStorage();
    }
});

function updateTaskList() {
    taskList.innerHTML = '';

    for (const taskName of taskListItems) {
        const listHtml = document.createElement('li');
        const taskDiv = document.createElement('div');
        const taskNameSpan = document.createElement('span');

        taskNameSpan.textContent = taskName;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete Task';
        completeButton.addEventListener('click', () => {
            // Implement the delete task functionality here
            const taskIndex = taskListItems.indexOf(taskName);
            if (taskIndex !== -1) {
                taskListItems.splice(taskIndex, 1);
                updateTaskList();
                // Save tasks to Chrome storage when a task is completed
                saveTasksToStorage();
            }
        });

        taskDiv.appendChild(taskNameSpan);
        taskDiv.appendChild(completeButton);

        listHtml.appendChild(taskDiv);

        taskList.appendChild(listHtml);
    }
}
