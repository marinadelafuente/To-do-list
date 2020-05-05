'use-script'

const search = document.querySelector('.js-search');
const searchForm = document.querySelector('.js-search-form');
const taskList = document.querySelector('.js-tasks');
const addForm = document.querySelector('.js-add');
const done = document.querySelector('.js-done-tasks');
const addTask = document.querySelector('.js-add-task');
const input = document.querySelector('.js-input');
const taskPlus = document.querySelector('.task-plus');


// ADD NEW TASK
const handlerAddTask = ev => {
    ev.preventDefault()
    const task = input.value.trim(); // trim remove any white spaces before/after the string
    if (task.length) {
        generateTasksHtml(task);
        addForm.reset(); // resets all the input fields inside the form
    }
    drag();
}

const generateTasksHtml = task => {
    const now = new Date();
    const html = `<li class="item-added li list-group-item d-flex justify-content-between align-items-center">${task}<span class="date">${now.toLocaleDateString()}<i class="fas fa-trash-alt delete"></i></span></li>`
    taskList.innerHTML += html;
}

handlerValidation = () => {
    if (input.value.length) {
        addTask.classList.add('cursor');
        taskPlus.classList.add('validated');
    }
    else {
        addTask.classList.remove('cursor');
        taskPlus.classList.remove('validated');
    }
}

// SEARCH FOR A TASK
const handlerSearchTask = () => {
    const searchTerm = search.value.trim().toLowerCase();
    filterTasks(searchTerm);
};

const filterTasks = (searchTerm) => {
    let tasks = Array.from(taskList.children); // we have to transform it into an array to use array methods in it

    tasks
        .filter(task => !task.textContent.toLowerCase().includes(searchTerm))
        .forEach(task => task.classList.add('hidden'))

    tasks
        .filter(task => task.textContent.toLowerCase().includes(searchTerm))
        .forEach(task => task.classList.remove('hidden'))
}

// DELETE TASKS
const deleteTasks = (ev) => {
    if (ev.target.classList.contains('delete')) {
        ev.target.parentElement.parentElement.remove();
    }
};

addForm.addEventListener('submit', handlerAddTask);
addTask.addEventListener('click', handlerAddTask);
taskPlus.addEventListener('click', handlerAddTask);
taskList.addEventListener('click', deleteTasks);
done.addEventListener('click', deleteTasks);
search.addEventListener('keyup', handlerSearchTask);
input.addEventListener('keyup', handlerValidation);

