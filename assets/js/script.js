const indicator = document.querySelector(".indicator");
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

const modal = document.querySelector(".modal");
const close_modal = document.querySelector(".modal-close");

const check = () => {
  if (localStorage.getItem("username")) {
    instructions.style.display = "none";
    indicator.style.display = "inline-block";
    loginBtn.style.display = "none";
    h1.innerText = "TOUDOU-LISTE de " + localStorage.getItem("username").toUpperCase();
    const tasks = localStorage.getItem("tasks");
    if (tasks.length == 0) {
      setHasChanged(0);
      importBtn.style.display = "initial";
      exportBtn.style.display = "none";
    } else {
      if (hasChanged()) {
        indicator.style.backgroundColor = "red";
      } else {
        indicator.style.backgroundColor = "greenyellow";
      }
      exportBtn.style.display = "initial";
      importBtn.style.display = "none";
    }
    logoutBtn.style.display = "initial";
    todo.style.display = "initial";
    todo.focus();
    addBtn.style.display = "initial";
  } else {
    indicator.style.display = "none";
    logoutBtn.style.display = "none";
    importBtn.style.display = "none";
    exportBtn.style.display = "none";
    todo.style.display = "none";
    addBtn.style.display = "none";
    instructions.style.display = "initial";
    loginBtn.style.display = "initial";
    h1.innerText = "";
    randomemission();
  }
  form.style.display = "none";
}

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

const modalalert = (message) => {
  const modal_msg = document.querySelector(".modal-message");
  modal_msg.textContent = message;
  modal.style.display = "block";
}

close_modal.addEventListener("click", () => {
  modal.style.display = "none";
});

const randomemission = () => {
  const emissions = [
    "La Météo des Plantes.",
    "Le Chien des Carpates (téléfilm).",
    "Ma Trousse de Toilette (divertissement).",
    "Un Peignoir pour deux (film).",
    "Le Point sur la Situation (actualités).",
    "Vidéo Clips (musique)",
    "Le Journal de 12 heures.",
    "Le Journal de 21 heures",
    "Le Journal de la Nuit.",
    "Camomille et Cannelle (film)",
    "Le Hit des Tops (musique).",
    "Le Temps se Gâte (météo).",
    "Chauve qui Peut (rire).",
    "Perds pas la Boule (actualités).",
    "La Matinale Télévisée (divertissement).",
    "Roméo et Colette (feuilleton).",
    "A vous Cognacq-Jay avec René Tendron (finances)",
    "Les Doigts dans la Méprise (actualités).",
    "La Nuit dans les Chaumières (documentaire).",
    "L'Académie des Nazes (jeu).",
    "Spéculos : Anatomie d'un Biscuit (documentaire)",
    "Monsieur, Madame (documentaire).",
  ]
  const emission = document.querySelector(".emission");
  emission.textContent = emissions[(Math.random() * (emissions.length - 1)).toFixed(0)];
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
  todo.value = "";
  indicator.style.backgroundColor = "greenyellow";
  check();
  modalalert("Ma déconnexion s'est déroulée avec succès.")
});

submitBtn.addEventListener("click", () => {
  if (username.value) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("tasks", []);
    modalalert("Ma connexion s'est déroulée avec succès. En cliquant sur [importer], je peux charger une TOUDOU-LISTE sauvée précédemment.")
  }
  check()
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
  setHasChanged(0);
  check();
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
        setHasChanged(0);
        check()
        removeitems();
        updateitems();
        modalalert("J'ai retrouvé ma TODOU-LISTE !");
      }
    }
  });
  todofile.click();
});

const setHasChanged = (value) => {
  localStorage.setItem("changed", value);
}

const hasChanged = () => {
  const value = localStorage.getItem("changed");
  if (value) {
    return Boolean(parseInt(value))
  }
  return false;
}

addBtn.addEventListener("click", additem);

form.addEventListener("submit", (e) => e.preventDefault());
formadd.addEventListener("submit", (e) => e.preventDefault());

check();
removeitems();
updateitems();
