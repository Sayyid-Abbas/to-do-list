let myInput = document.querySelector(".input");
let add = document.querySelector(".add");
let clearButton = document.querySelector(".clear");
let myTasksDiv = document.querySelector(".tasks");
let tasks = [];

if(window.localStorage.getItem("tasks")) {
    tasks = JSON.parse(window.localStorage.getItem("tasks"));
    myTasksDiv.style.display = "flex";
    clearButton.style.display = "flex";
}

addLocalToPage();

myInput.addEventListener("keypress", e => {
  if (e.key === "Enter") add.click();
});

add.onclick = () => {
    if((myInput.value).trim() !== "") {
        addToArray(myInput.value);
        myTasksDiv.style.display = "flex";
        clearButton.style.display = "flex";
        myInput.value = "";
    }
};

myTasksDiv.addEventListener("click", e => {
    if(e.target.classList.contains("delete")) {
        deleteFromLocal(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
        if(tasks.length === 0) {
            myTasksDiv.style.display = "none";
            clearButton.style.display = "none";
        } else {
            myTasksDiv.style.display = "flex";
            clearButton.style.display = "flex";
        }
    }
});

function addToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
    };
    tasks.push(task);
    addTasksToPage(tasks);
    addTasksToLocal(tasks);
}

function addTasksToPage(tasks) {
    myTasksDiv.innerHTML = "";
    tasks.forEach(task => {
        let myTask = document.createElement("div");
        myTask.className = "task";
        myTask.setAttribute("data-id", task.id);

        let textInTask = document.createElement("span");
        textInTask.className = "text-in-task";
        textInTask.textContent = task.title;
        
        myTask.appendChild(textInTask);

        let deleteButton = document.createElement("span");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete";

        myTask.appendChild(deleteButton);
        myTasksDiv.appendChild(myTask);
    });
}

function addTasksToLocal(tasks) {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addLocalToPage() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        tasks = JSON.parse(data);
        addTasksToPage(tasks);
        if(tasks.length === 0) {
            myTasksDiv.style.display = "none";
            clearButton.style.display = "none";
        } else {
            myTasksDiv.style.display = "flex";
            clearButton.style.display = "flex";
        }
    }
}
function deleteFromLocal(taskId) {
    tasks = tasks.filter(task => task.id != taskId);
    addTasksToLocal(tasks);
}
clearButton.onclick = function () {
    window.localStorage.clear();
    tasks = [];
    clearButton.style.display = "none";
    myTasksDiv.innerHTML = "";
    myTasksDiv.style.display = "none";
};