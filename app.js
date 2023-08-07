//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoCheck = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletechek);
todoCheck.addEventListener("click", filterOption);

//Function

function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  // Create Todo DIV
  // console.log("Checkpoint 1");
  if (todoInput.value === "") return;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const list = document.createElement("li");
  list.classList.add("todo-item");
  list.innerText = todoInput.value;

  //Save Data to local Storage
  saveLocalStorage(todoInput.value);

  //Append list as a child to Div
  todoDiv.appendChild(list);
  // console.log("Checkpoint 2");

  //Create complete button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fa-solid fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // console.log("Checkpoint 3");

  //Create Delete Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("delete-btn");
  todoDiv.appendChild(trashButton);
  // console.log("Checkpoint 4");

  // Add Div section to ToDo List
  todoList.appendChild(todoDiv);

  // Clear form value
  todoInput.value = "";
}

//For deleting the todo
function deletechek(e) {
  const item = e.target;
  //fOR DELETING LIST
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteLocalItem(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //FOR CHECKING THE LIST WHICH IS COMPLETED
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Function for filtering out the Work completed or not
function filterOption(e) {
  const nodes = todoList.childNodes;
  console.log(nodes);
  nodes.forEach(function (node) {
    switch (e.target.value) {
      case "all":
        node.style.display = "flex";
        break;
      case "completed":
        if (node.classList.contains("completed")) {
          node.style.display = "flex";
        } else {
          node.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!node.classList.contains("completed")) {
          node.style.display = "flex";
        } else {
          node.style.display = "none";
        }
    }
  });
}

//Function for storing the ToDo work in our local storage
function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Function for getting all the list if it has been refreshed or restoring the closed tab
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Code reuse

    // Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const list = document.createElement("li");
    list.innerText = todo;
    list.classList.add("todo-item");

    //Append list as a child to Div
    todoDiv.appendChild(list);

    //Create complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa-solid fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);

    // Add Div section to ToDo List
    todoList.appendChild(todoDiv);
  });
}

//Remove item from LocalStorage if it has been deleted
function deleteLocalItem(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const item = todo.children[0].innerText;
  todos.splice(todos.indexOf(item), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
