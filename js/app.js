"use-script";

const search = document.querySelector(".js-search");
const searchForm = document.querySelector(".js-search-form");
const taskList = document.querySelector(".js-tasks");
const addForm = document.querySelector(".js-add");
const done = document.querySelector(".js-done-tasks");
const addTask = document.querySelector(".js-add-task");
const input = document.querySelector(".js-input");
const taskPlus = document.querySelector(".task-plus");
const boxes = document.querySelectorAll(".box");

let newTasks = Array.from(taskList.children);
let newLSTasks = [];
console.log(newTasks);

// TITLE SCROLL REVEALING
let revealing = {
  origin: "left",
  distance: "110px",
  opacity: 0,
  easing: "ease-in",
  duration: 800,
};

ScrollReveal().reveal(".page-title", revealing);

function getLocalStorage() {
  newLSTasks = localStorage.getItem("newLSTasks");
  newLSTasks = JSON.parse(newLSTasks);
  if (newLSTasks !== null) {
    newTasks = newLSTasks;
    generateHtmlTemplate();
    listenTasks();
    drag();
  }
}

function setLocalStorage() {
  localStorage.setItem("newLSTasks", JSON.stringify(newTasks));
}

// ADD NEW TASK
const handlerAddTask = (ev) => {
  ev.preventDefault();
  const task = input.value.trim(); // trim remove any white spaces before/after the string
  if (task.length) {
    newTasks.push(task);

    generateHtmlTemplate();
    listenTasks();
    handlerValidation();
    addForm.reset(); // resets all the input fields inside the form
  }
  drag();
  setLocalStorage();
};

const generateHtmlTemplate = function () {
  let html = "";

  for (let i = 0; i < newTasks.length; i++) {
    const index = newTasks.indexOf(newTasks[i]);
    const now = new Date();
    html += `<li class="item-added li list-group-item d-flex justify-content-between align-items-center" draggable="true" id=${index}>${
      newTasks[i]
    }<span class="date">${now.toLocaleDateString()}<i class="fas fa-trash-alt delete"></i></span></li>`;
  }
  taskList.innerHTML = html;
  listenTasks();
};

const listenTasks = function () {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", deleteTask);
  });
};

// DELETE TASKS
function deleteTask(ev) {
  if (ev.target.classList.contains("delete")) {
    ev.target.parentElement.parentElement.remove();
    taskId = parseInt(ev.target.parentElement.parentElement.id);
    newTasks.splice(taskId, 1);
    setLocalStorage();
  }
}

const handlerValidation = () => {
  if (input.value.length) {
    addTask.classList.add("cursor");
    taskPlus.classList.add("validated");
  } else {
    addTask.classList.remove("cursor");
    taskPlus.classList.remove("validated");
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
    .filter((task) => !task.textContent.toLowerCase().includes(searchTerm))
    .forEach((task) => task.classList.add("hidden"));

  tasks
    .filter((task) => task.textContent.toLowerCase().includes(searchTerm))
    .forEach((task) => task.classList.remove("hidden"));
};

// DRAG TASKS
function drag() {
  let tasks = Array.from(taskList.children);
  tasks.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);

    function dragStart(ev) {
      draggedItem = ev.target;
      this.classList.add("hold");
      setTimeout(() => this.classList.add("hidden"), 0);
    }

    function dragEnd() {
      this.classList.remove("hidden", "hold");
      this.style.display = "block";
    }
  });
}
function dragOver(ev) {
  ev.preventDefault();
  this.style.backgroundColor = "#311b9265";
}
function dragEnter(ev) {
  ev.preventDefault();
  this.style.backgroundColor = "#352f5b00";
}
function dragLeave(ev) {
  ev.preventDefault();
  this.style.backgroundColor = "#352f5b00";
}
function dragDrop() {
  this.prepend(draggedItem);
  this.classList.add("done");
  this.style.backgroundColor = "#352f5b00";
}
function dragDropBack() {
  this.prepend(draggedItem);
  this.classList.remove("done");
  this.style.backgroundColor = "#352f5b00";
}

// BOX ANIMATION
gsap.from(".box", {
  duration: 2,
  scale: 0.5,
  opacity: 0,
  delay: 0.5,
  stagger: 0.2,
  ease: "elastic",
  force3D: true,
});

boxes.forEach(function (box) {
  box.addEventListener("click", animation);
});

function animation() {
  gsap.to(".box", {
    duration: 0.5,
    opacity: 0,
    y: -100,
    stagger: 0.1,
    ease: "back.in",
  });
}

//EVENT LISTENERS

addForm.addEventListener("submit", handlerAddTask);
addTask.addEventListener("click", handlerAddTask);
taskPlus.addEventListener("click", handlerAddTask);
search.addEventListener("keyup", handlerSearchTask);
input.addEventListener("keyup", handlerValidation);
done.addEventListener("click", deleteTask);

drag();

done.addEventListener("dragover", dragOver);
taskList.addEventListener("dragover", dragOver);

done.addEventListener("dragenter", dragEnter);
taskList.addEventListener("dragenter", dragEnter);

done.addEventListener("dragleave", dragLeave);
taskList.addEventListener("dragleave", dragLeave);

done.addEventListener("drop", dragDrop);
taskList.addEventListener("drop", dragDropBack);

getLocalStorage();
