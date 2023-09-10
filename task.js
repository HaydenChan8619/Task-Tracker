const title = document.getElementById('title');
const task = document.getElementById('task');
const confrimTask = document.getElementById('confirmTask');
const taskList = document.getElementById('taskList');

let taskMap = new Map();

confrimTask.addEventListener('click', () => {
    console.log('Button clicked');
    const taskValue = task.value;

    if (taskValue.trim() !== '' && !(taskMap.has(taskValue))) {
        taskMap.set(taskValue,0); // push the task in with a time of 0 seconds
        task.value = '';
        updateTaskList();
    }

})

function updateTaskList() {
    taskList.innerHTML = '';

    for (const[taskName, taskTime] of taskMap) {
        const listHtml = document.createElement('li');
        const taskDiv = document.createElement('div');
        const taskNameSpan = document.createElement('span');
        const taskTimeSpan = document.createElement('span');
        
        taskNameSpan.textContent = taskName;
        taskTimeSpan.textContent = `Time Spent: ${taskTime} seconds`;

        taskDiv.appendChild(taskNameSpan);
        taskDiv.appendChild(taskTimeSpan);

        listHtml.appendChild(taskDiv);

        taskList.appendChild(listHtml);
    }
}