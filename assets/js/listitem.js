const updateitems = () => {
  let todoitems = getitems();
  let value = "";

  if (todoitems) {
    for (var i = 0; i < todoitems.length; i++) {
      const items = document.querySelector(".todolist");
      let item = document.createElement("li");
      if (todoitems[i].startsWith("#")) {
        item.classList.add("checked");
        checkitem(i, true);
        value = todoitems[i].replace("#", "");
      } else {
        value = todoitems[i];
      }
      let node = document.createTextNode(value);
      let span = document.createElement("span");
      let text = document.createTextNode("\u00d7");
      item.classList.add("todoitem");
      item.id = i;
      item.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
          checked = e.target.classList.contains("checked");
          checkitem(e.target.id, checked);
          setHasChanged(1);
          check();
        }
      });
      item.appendChild(node);
      span.className = "close";
      span.addEventListener("click", removetask)
      span.appendChild(text);
      item.appendChild(span);
      items.appendChild(item);
    }
  }
}

const removeitems = () => {
  const todolist = document.querySelector(".todolist");
  while (todolist.children.length > 0) {
    todolist.removeChild(todolist.children[0]);
  }
  check();
}

const removetask = (e) => {
  const id = e.target.parentElement.id;
  const items = getitems();
  items.splice(parseInt(id), 1);
  localStorage.setItem("tasks", items);
  setHasChanged(1);
  removeitems();
  updateitems();
}

const additem = () => {
  const todo = document.querySelector("#todo");
  if (todo.value) {
    let items = getitems();
    items.push(todo.value);
    localStorage.setItem("tasks", items);
    setHasChanged(1);
    removeitems();
    updateitems();
    check();
    todo.value = "";
    todo.focus();
  }
}

const checkitem = (index, checked) => {
  let items = getitems();
  if (checked) {
    if (!items[index].startsWith("#")) {
      items[index] = "#" + items[index];
    }
  } else {
    items[index] = items[index].replace("#", "");
  }
  localStorage.setItem("tasks", items);
}

const getitems = () => {
  let items = localStorage.getItem("tasks");
  if (items) {
    return items.split(",");
  }
  return [];
}
