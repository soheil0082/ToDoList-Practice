let input = document.querySelector(".input");
let inProgress = document.querySelectorAll("ul")[0];
let completed = document.querySelectorAll("ul")[1];
let taskList = [];
let deleteBtns = [];
let doneBtns = [];
let texts = [];

alert("You can click on each tasks text to edit it!");
document.forms[0].addEventListener("submit", addTask);

if (localStorage.getItem("tasks") != null)
  taskList = JSON.parse(localStorage.getItem("tasks"));

renderTasks();

function addTask(e) {
  e.preventDefault();
  let text = input.value;
  input.value = "";

  if (text != "") {
    let newTask = {
      done: false,
      content: text,
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTasks();
  } else {
    alert("you cant have an empty task! wrtie something");
  }
}

function deleteTask(e) {
  for (let i = 0; i < taskList.length; i++) {
    if (e.target.parentElement.innerText == taskList[i].content) {
      taskList.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }

  renderTasks();
}

function changeTaskState(e) {
  for (let i = 0; i < taskList.length; i++) {
    if (e.target.parentElement.innerText == taskList[i].content) {
      if (taskList[i].done) {
        taskList[i].done = false;
      } else {
        taskList[i].done = true;
      }
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }

  renderTasks();
}

function editTask(e) {
  let temp;
  for (let i = 0; i < taskList.length; i++) {
    if (e.target.innerText == taskList[i].content) {
      temp = taskList[i];
      e.target.innerHTML = `<form action="">
        <input type="text" class="editInput" placeholder="${taskList[i].content}">
      </form>`;
    }
  }

  document.forms[1].addEventListener("submit", function (e) {
    e.preventDefault();

    editInput = document.querySelector(".editInput");
    if (editInput != null) {
      let text = editInput.value;
      editInput.value = "";

      if (text != "") {
        for (let i = 0; i < taskList.length; i++) {
          if (temp.content == taskList[i].content) {
            taskList[i].content = text;
          }
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTasks();
      }
    }
  });
}

function renderTasks() {
  inProgress.innerHTML = `<li class="title" style="background-color: #DED77B;">In progress</li>`;
  completed.innerHTML = `<li class="title">Done!</li>`;

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].done) {
      completed.innerHTML += `
      <li>
      <i class="fa-regular fa-square-check"></i>
          <p class="--done">
          ${taskList[i].content}
          </p>
          <i class="fa-solid fa-xmark"></i>
      </li>`;
    } else {
      inProgress.innerHTML += `
      <li>
          <i class="fa-regular fa-square"></i>
          <p>
          ${taskList[i].content}
          </p>
          <i class="fa-solid fa-xmark"></i>
      </li>`;
    }
  }

  deleteBtns = document.querySelectorAll(".fa-xmark");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteTask);
  }

  doneBtns = document.querySelectorAll(".fa-regular");
  for (let i = 0; i < doneBtns.length; i++) {
    doneBtns[i].addEventListener("click", changeTaskState);
  }

  texts = document.querySelectorAll("p");
  for (let i = 0; i < texts.length; i++) {
    texts[i].addEventListener("click", editTask);
  }
}
