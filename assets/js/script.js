const loginBtn = document.querySelector("#login");
const logoutBtn = document.querySelector("#logout");
const importBtn = document.querySelector("#import");
const exportBtn = document.querySelector("#export");
const instructions = document.querySelector(".instructions");
const form = document.querySelector(".login");
const formadd = document.querySelector(".additem");
const username = document.querySelector("#username");
const submitBtn = document.querySelector(".subreg");
const h1 = document.querySelector("h1")
const todo = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

const check = () => {
  if (localStorage.getItem("username")) {
    instructions.style.display = "none";
    loginBtn.style.display = "none";
    h1.innerText = "TOUDOU-LISTE de " + localStorage.getItem("username").toUpperCase();
    const tasks = localStorage.getItem("tasks");
    if (tasks.length == 0) {
      importBtn.style.display = "initial";
      exportBtn.style.display = "none";
    } else {
      exportBtn.style.display = "initial";
      importBtn.style.display = "none";
    }
    logoutBtn.style.display = "initial";
    todo.style.display = "initial";
    todo.focus();
    addBtn.style.display = "initial";
  } else {
    logoutBtn.style.display = "none";
    importBtn.style.display = "none";
    exportBtn.style.display = "none";
    todo.style.display = "none";
    addBtn.style.display = "none";
    instructions.style.display = "initial";
    loginBtn.style.display = "initial";
    h1.innerText = "";
  }
  form.style.display = "none";
}

const login = () => {
  loginBtn.style.display = "none";
  form.style.display = "initial";
  username.focus();
}

loginBtn.addEventListener("click", login);

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  removeitems();
  username.value = "";
  check();
  modalalert("Ma déconnexion s'est déroulée avec succès.")
});

submitBtn.addEventListener("click", () => {
  localStorage.setItem("username", username.value);
  localStorage.setItem("tasks", []);
  check();
  modalalert("Ma connexion s'est déroulée avec succès. En cliquant sur [importer], je peux charger une TOUDOU-LISTE sauvée précédemment.")
})

exportBtn.addEventListener("click", () => {
  const filename = localStorage.getItem("username").replace(" ", "_").toLowerCase() + ".tdl";
  const data = new Blob([JSON.stringify(localStorage)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => {
  const todofile = document.createElement("input")
  todofile.type = "file"
  todofile.accept = ".tdl";
  todofile.addEventListener("change", async (e) => {
    const [file] = e.target.files;
    if (file) {
      const content = await file.text();
      const json = JSON.parse(content);
      if (json.username != localStorage.getItem("username")) {
        modalalert("Le chargement de cette TOUDOU-LISTE a échoué avec succès. En effet, celle-ci appartient à un autre utilisateur...");
      } else {
        localStorage.setItem("tasks", json.tasks);
        check()
        removeitems();
        updateitems();
        modalalert("J'ai retrouvé ma TODOU-LISTE !");
      }
    }
  });
  todofile.click();
});

addBtn.addEventListener("click", additem);

form.addEventListener("submit", (e) => e.preventDefault());
formadd.addEventListener("submit", (e) => e.preventDefault());

check();
removeitems();
updateitems();
