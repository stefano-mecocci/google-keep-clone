import { Note } from "./Note.js";

//
// animazione barra di ricerca
//
let deleteBtn = document.getElementById("deleteBtn");
let searchBtn = document.getElementById("searchBtn");
let searchForm = deleteBtn.parentElement;
let searchInput = searchForm.children[1];

function attachEvents(element, eventList, handler) {
    for (const event of eventList) {
        element.addEventListener(event, handler);
    }
}

function toggleSearchformStyle() {
    searchForm.classList.toggle("search-active");

    deleteBtn.classList.toggle("visible");

    if (searchBtn.classList.contains("md-lighter")) {
        searchBtn.classList.replace("md-lighter", "md-darker");
        deleteBtn.classList.replace("md-lighter", "md-darker");
    } else {
        searchBtn.classList.replace("md-darker", "md-lighter");
        deleteBtn.classList.replace("md-darker", "md-lighter");
    }
}

attachEvents(searchInput, ["focus", "focusout"], toggleSearchformStyle);

//
// animazione menu laterale
//
let sidebar = document.getElementsByTagName("aside")[0];
let menuBtn = document.getElementById("menuBtn");
let main = document.getElementsByTagName("main")[0];
let isMenuOpen = true;

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-closed");

    if (window.innerWidth > 700) {
        main.classList.toggle("sidebar-closed");
    }

    isMenuOpen = !isMenuOpen;
});

function enlargeMenu() {
    if (window.innerWidth > 700 && !isMenuOpen) {
        sidebar.classList.toggle("sidebar-closed");
        main.classList.toggle("sidebar-closed");
    }
}

sidebar.addEventListener("mouseenter", enlargeMenu);
sidebar.addEventListener("mouseleave", enlargeMenu);

//
// funzionalità barra di ricerca
//

deleteBtn.addEventListener("focusout", () => {
    searchForm.reset(); // TODO: sistemare
});

//
// tooltips
//

const ids = [
    ['#menuBtn', 'Menu'], ['#searchBtn', 'Cerca'],
    ['#deleteBtn', 'Cancella'], ['#darkThemeBtn', 'Cambia tema'],
    ['#changeLayoutBtn', 'Layout'], ['#settingsBtn', 'Impostazioni']
];

for (let id of ids) {
    tippy(id[0], { content: id[1], arrow: false, offset: [0, 5], touch: false });
}

//
// crea una nuova nota
//
let createNoteForm = document.getElementById("createNoteForm");
let createNoteTextField = createNoteForm["text"];
let currentTab = "notes";

// autoresize textarea
function adjustTextarea() {
    createNoteTextField.style.height = 0;
    createNoteTextField.style.height = (createNoteTextField.scrollHeight) + "px";
}

createNoteTextField.addEventListener("input", adjustTextarea);
window.addEventListener("resize", adjustTextarea);

createNoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = createNoteForm["title"].value.trim();
    const text = createNoteTextField.value.trim();

    if (title != "" && text != "") {
        let note = new Note(title, text);
        let notes = document.getElementById(currentTab + "Tab").lastElementChild;

        notes.appendChild(note.build());
        createNoteForm.reset();
    }
})

//
// cambia layout
//

let changeLayoutBtn = document.getElementById("changeLayoutBtn");

changeLayoutBtn.addEventListener("click", function () {
    let notez = document.querySelectorAll(".note");
    let notes = document.getElementById(currentTab + "Tab").lastElementChild;

    notes.classList.toggle("one-column");

    for (let n of notez) {
        n.classList.toggle("one-column");
    }

    if (this.textContent == "grid_view") {
        this.textContent = "view_agenda";
    } else {
        this.textContent = "grid_view";
    }
})

//
// sidebar tab switch
//
sidebar.addEventListener("click", function (event) {
    let elem = event.target;
    let tabs = document.querySelectorAll(".tab");

    if (event.target.nodeName == "SPAN") {
        elem = elem.parentElement;
    }

    if (elem.nodeName != "ASIDE") {
        for (let voice of this.children) {
            voice.classList.remove("selected-entry");
            voice.firstElementChild.classList.replace("md-lighter", "md-light");
        }

        elem.classList.add("selected-entry");
        elem.firstElementChild.classList.replace("md-light", "md-lighter");

        for (let tab of tabs) {
            tab.style.display = "none";
        }

        if (elem.dataset.tab != "filter") {
            let tabToDisplay = document.getElementById(elem.dataset.tab + "Tab");
            tabToDisplay.style.display = "flex";
        }
    }
})
