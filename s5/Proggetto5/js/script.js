var todo = {

  data: [],
  hAdd: null,
  hTemplate: null,
  hList: null,
  init: () => {

    if (localStorage.todo == undefined) { localStorage.todo = "[]"; }


    todo.data = JSON.parse(localStorage.todo);


    todo.hAdd = document.getElementById("todo-item");
    todo.hTemplate = document.getElementById("todo-template").content;
    todo.hList = document.getElementById("todo-list");


    document.getElementById("todo-add").onsubmit = todo.add;


    todo.draw();
  },


  draw: () => {

    todo.hList.innerHTML = "";


    if (todo.data.length > 0) {
      for (let id in todo.data) {
        let row = todo.hTemplate.cloneNode(true);
        row.querySelector(".todo-item").textContent = todo.data[id][0];
        row.querySelector(".todo-done").onclick = () => { todo.toggle(id); };
        row.querySelector(".todo-del").onclick = () => { todo.del(id); };
        if (todo.data[id][1]) {
          row.querySelector(".todo-item").classList.add("todo-ok");
        }
        todo.hList.appendChild(row);
      }
    }
  },


  save: () => {
    localStorage.todo = JSON.stringify(todo.data);
    todo.draw();
  },


  add: () => {
    todo.data.push([todo.hAdd.value, false]);
    todo.hAdd.value = "";
    todo.save();
    return false;
  },


  toggle: (id) => {
    todo.data[id][1] = !todo.data[id][1];
    todo.save();
  },


  del: (id) => {
    if (confirm("Delete task?")) {
      todo.data.splice(id, 1);
      todo.save();
    }
  }
};


window.addEventListener("load", todo.init);
