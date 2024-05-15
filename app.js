const todoInput = document.getElementById("todo");
const addTodo = document.getElementById("app-submit");
const appList = document.getElementById("app-list");

const todoKEY = "todos";

let todos = JSON.parse(localStorage.getItem(todoKEY)) || [];

showTodoInDOM(todos);

addTodo.addEventListener("click", createTodo);

function createTodo() {
  const trimmedValue = todoInput.value.trim();
  if (!trimmedValue) {
    todoInput.value = "";
    placeholderMessage(false, "Please enter a todo!");
    return;
  }

  pushTodoToArray(trimmedValue);
  showTodoInDOM(todos);
  setToLocalStorage(todos);
  todoInput.value = "";
  placeholderMessage(true, "What's Your ToDo?");
}

function pushTodoToArray(text) {
  todos.push({
    text,
    completed: false,
    id: Date.now(),
  });
}

function showTodoInDOM(todoArray) {
  appList.innerHTML = "";
  todoArray.forEach((element) => {
    const todoElement = createTodoElement(element.text, element.id);
    appendTodoToDOM(todoElement);
  });
}

function setToLocalStorage(array) {
  try {
    localStorage.setItem(todoKEY, JSON.stringify(array));
  } catch (error) {
    console.error("Error storing todos in local storage:", error.message);
  }
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

function createTodoElement(text, id) {
  const element = document.createElement("div");
  element.id = id;
  element.classList.add("app__list-todo", "circul-style");

  const textNode = document.createTextNode(text);
  element.appendChild(textNode);

  const button = createDeleteButton(id);
  element.appendChild(button);

  return element;
}

function createDeleteButton(id) {
  const button = document.createElement("button");
  button.classList.add("app__list-todo-delete");
  button.textContent = "DELETE";
  button.addEventListener("click", function () {
    deleteTodo(id);
  });
  return button;
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  showTodoInDOM(todos);
  setToLocalStorage(todos);
}

function appendTodoToDOM(todoElement) {
  appList.appendChild(todoElement);
}
