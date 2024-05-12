const todoInput = document.getElementById("todo");
const addTodo = document.getElementById("app-submit");
const appList = document.getElementById("app-list");

let todoKEY = "todos";
let todos = JSON.parse(localStorage.getItem(todoKEY)) || [];

showTodoInDOM(todos);

addTodo.addEventListener("click", (e) => {
  e.preventDefault();
  createTodo();
  console.log(todos);
});
// localStorage.clear();
function createTodo() {
  if (!todoInput.value) {
    placeholderMessage(false, "Please enter a todo!");
  } else {
    pushTodoToArray();
    localStorage.setItem(todoKEY, JSON.stringify(todos));
    showTodoInDOM(todos);
    todoInput.value = "";
    placeholderMessage(true, "What's Your ToDo?");
  }
}

function pushTodoToArray() {
  todos.push({
    text: todoInput.value,
    completed: false,
    id: Date.now(),
  });
}

function placeholderMessage(check, message) {
  if (check) {
    todoInput.classList.remove("empty-todo");
    todoInput.setAttribute("placeholder", message);
  } else {
    todoInput.classList.add("empty-todo");
    todoInput.setAttribute("placeholder", message);
  }
}

function createTodoHtmlElement(text, id) {
  const element = document.createElement("div");
  element.id = id;
  element.classList.add("app__list-todo", "circul-style");

  const textNode = document.createTextNode(text);
  element.appendChild(textNode);

  const button = document.createElement("button");
  button.classList.add("app__list-todo-delete");
  button.textContent = "DELETE";

  element.appendChild(button);

  appList.appendChild(element);
}

function showTodoInDOM(todoArray) {
  appList.innerHTML = "";
  todoArray.forEach((element) => {
    console.log(element);
    createTodoHtmlElement(element.text, element.id);
  });
}
