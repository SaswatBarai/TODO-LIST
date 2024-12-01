let todoInput = document.getElementById("todoinput");
let content = document.querySelector("#allTodo");
let data = JSON.parse(localStorage.getItem("allTodo")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayTodo();
});

function displayTodo() {
  document.getElementById("allTodo").innerHTML = ""; // Clear the container
  data.map((singleTodo, id) => {
    todoStruture(singleTodo, id);
  });
}

function todoStruture(singleTodo, id) {
  let newDiv = document.createElement("div");
  newDiv.className = "singleTodo";

  newDiv.innerHTML = `
    <h2>${singleTodo.val}</h2>
    <input type="checkbox" ${singleTodo.completed ? "checked" : ""}>
    <button>Remove</button>
  `;

  let btn = newDiv.getElementsByTagName("button")[0];
  let checkbox = newDiv.getElementsByTagName("input")[0];
  let h2 = newDiv.querySelector("h2"); // Select <h2> inside newDiv

  btn.addEventListener("click", () => {
    removeTodo(id);
  });

  if (singleTodo.completed) {
    h2.classList.add("completed");
  }

  checkbox.addEventListener("click", () => {
    markTodo(id);
  });

  document.getElementById("allTodo").append(newDiv);
}

document.querySelector("#addBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let val = todoInput.value.trim();
  if (val !== "") {
    data.push({ val, completed: false });
    todoInput.value = "";
    localStorage.setItem("allTodo", JSON.stringify(data));
    displayTodo();
  }
});

function removeTodo(id) {
  data.splice(id, 1);
  localStorage.setItem("allTodo", JSON.stringify(data));
  displayTodo();
}

function markTodo(id) {
  data[id].completed = !data[id].completed; // Toggle completion state
  localStorage.setItem("allTodo", JSON.stringify(data));
  displayTodo();
}
