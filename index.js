const btn = document.querySelector(".add-btn");

const saveBtn = document.querySelector(".save-btn");

const delBtn = document.querySelector("#deleteBtn");

const removeAll = document.querySelector(".remove-all");

let input = document.querySelector(".input");

let inputHidden = document.querySelector(".input-hidden");

localStorage.setItem('items', JSON.stringify(['Eat, Sleep, Code, Repeat']))

window.addEventListener("load", () => {
  items = JSON.parse(localStorage.getItem("items")) || [];

  const addTodo = () => {
    if (input.value.trim() == "") {
      alert("Please enter a Todo");
    } else {
      todo = input.value;
      items.push(todo);
      localStorage.setItem("items", JSON.stringify(items));
      showList();
    }
    input.value = "";
    showList();
  };

  const showList = () => {
    let todoList = document.querySelector(".todo-list ul");
    todoList.innerHTML = "";

    items.forEach((e, i) => {
      let li = document.createElement("li");
      li.classList.add('single-todo')
      todoList.appendChild(li);

      let span = document.createElement("span")
      span.textContent=e
      li.appendChild(span)

      let editBtn = document.createElement("button");
      editBtn.classList.add("edit-button")
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
      li.appendChild(editBtn);
      editBtn.addEventListener("click", () => editItem(i));

      let delBtn = document.createElement("button");
      delBtn.innerHTML='<i class="fa-solid fa-trash"></i>'
      li.appendChild(delBtn);
      delBtn.addEventListener("click", () => removeItem(i));
    });

    if(items.length > 1){
      removeAll.style.display='initial'
    }
    else{
      removeAll.style.display='none'
    }
  };

  showList();

  const editItem = (i) => {
    saveBtn.style.display = 'initial'
    btn.style.display='none'
    inputHidden.value=i
    input.value=items[i]
  };

  const saveTodo = () => {
    saveBtn.style.display='none'
    btn.style.display='initial'
    items[inputHidden.value] = input.value
    input.value=''
    localStorage.setItem('items', JSON.stringify(items))
    showList()
  }

  const removeItem = (i) => {
    items = items.filter((_, ind) => i != ind);
    localStorage.setItem("items", JSON.stringify(items));
    showList();
  };

  const clearAll = () => {
    items = [];
    localStorage.clear();
    showList();
  };

  btn.addEventListener("click", addTodo);

  saveBtn.addEventListener("click", saveTodo);

  removeAll.addEventListener("click", clearAll);
});
