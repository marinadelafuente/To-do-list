'use-script'

const search = document.querySelector('.js-search');
const searchForm = document.querySelector('.js-search-form');
const taskList = document.querySelector('.js-tasks');
const addForm = document.querySelector('.js-add');


// ADD NEW TASK
const handlerAddTask = ev => {
    ev.preventDefault()
    console.log(taskList.children);
    const task = addForm.addTask.value.trim(); // trim remove any white spaces before/after the string
    if (task.length) {
        generateTasksHtml(task);
        addForm.reset(); // resets all the inputs fields inside the form
        console.log(taskList.children);
    }
}

const generateTasksHtml = task => {
    const now = new Date();
    const html = `<li class="item-added li list-group-item d-flex justify-content-between align-items-center" draggable="true">${task}</li>`
    taskList.innerHTML += html;
}


addForm.addEventListener('submit', handlerAddTask);



