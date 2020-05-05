'use-script'

const search = document.querySelector('.js-search');
const searchForm = document.querySelector('.js-search-form');
const taskList = document.querySelector('.js-tasks');
const addForm = document.querySelector('.js-add');


// ADD NEW TASK
const handlerAddTask = ev => {
    ev.preventDefault()
    const task = addForm.addTask.value.trim(); // trim remove any white spaces before/after the string
    if (task.length) {
        generateTasksHtml(task);
        addForm.reset(); // resets all the inputs fields inside the form
    }
}

const generateTasksHtml = task => {
    const now = new Date();
    const html = `<li class="item-added li list-group-item d-flex justify-content-between align-items-center">${task}<span class="date">${now.toLocaleDateString()}<i class="fas fa-trash-alt delete"></i></span></li>`
    taskList.innerHTML += html;
}

// DELETE TASKS

const deleteTasks = (ev) => {
    if (ev.target.classList.contains('delete')) {
        ev.target.parentElement.parentElement.remove();
    }
};

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


addForm.addEventListener('submit', handlerAddTask);
taskList.addEventListener('click', deleteTasks);
search.addEventListener('keyup', handlerSearchTask);


