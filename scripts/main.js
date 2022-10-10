let g_currentTab = "notes";
let g_darkTheme = true;
let g_sidemenuOpen = true;
let layoutOneColumn = false;

let searchInput = document.getElementById('searchInput');
let deleteButton = document.getElementById('deleteButton');
let navCenter = document.querySelector('.navbar__center');
let container = document.querySelector('.container');
let sidemenu = document.getElementById('sidemenu');
let notes = document.querySelectorAll('.note');
let sections = document.querySelectorAll('.section');
let center = document.querySelector('.center');
let changeLayoutButton = document.getElementById('gridButton');

function getSection(sect = null) {
  if (sect === null) {
    sect = g_currentTab;
  }

  let c = document.getElementById(sect).children;

  for (let i = 0; i < c.length; i++) {
    if (c[i].classList.contains("section")) {
      return c[i];
    }
  }
}

const ids = [
  ['#menuButton', 'Menu'], ['#searchButton', 'Cerca'],
  ['#deleteButton', 'Cancella'], ['#switchThemeButton', 'Cambia tema'],
  ['#gridButton', 'Layout'], ['#settingsButton', 'Impostazioni'],
  ['#addNote', 'Crea nota']
];

for (let id of ids) {
  tippy(id[0], {content: id[1], arrow: false, offset: [0, 5]});
}

/*
==========================================================

CAMBIO DI LAYOUT

==========================================================
*/

changeLayoutButton.addEventListener('click', function(e) {
  if (this.textContent == 'table_rows') {
    this.textContent = 'grid_view';
  } else {
    this.textContent = 'table_rows'
    layoutOneColumn = true;
  }

  let notes = document.querySelectorAll('.note');

  notes.forEach(n => {
    n.classList.toggle('one-column');
  });

  sections.forEach(n => {
    n.classList.toggle('one-column');
  });

  center.classList.toggle('one-column');
});

/*
==========================================================

BARRA DI RICERCA

==========================================================
*/

deleteButton.addEventListener('click', function() {
  searchInput.value = "";
  filterNotes.apply({value: ""});
});

navCenter.addEventListener('click', function() {
  deleteButton.style.visibility = 'visible';
});

container.addEventListener('click', function() {
  deleteButton.style.visibility = 'hidden';
});

let createNoteArea = document.getElementById('createNoteInput');

createNoteArea.addEventListener('input', function() {
  createNoteArea.style.height = '';
  createNoteArea.style.height = createNoteArea.scrollHeight + 'px'
});

function filterNotes() {
  let x = this.value.trim();
  let notes = Array.from(getSection().children);

  if (x == '') {
    notes.forEach(n => {
      n.style.display = 'block';
    });

    return;
  }

  notes.forEach(n => {
    n.style.display = 'none';
  });

  for (let i = 0; i < notes.length; i++) {
    let text = notes[i].children[1].textContent;

    if (text.toLowerCase().includes(x.toLowerCase())) {
      notes[i].style.display = 'block';
    }
  }
}

searchInput.addEventListener("change", filterNotes);
searchInput.addEventListener("keyup", filterNotes);

/*
==========================================================

TAB SWITCHING

==========================================================
*/

function switchTab(tabName) {
  let newTab = document.getElementById(tabName);

  if (newTab !== null) {
    g_currentTab = tabName;

    for (let c of center.children) {
      c.style.display = 'none';
    }

    newTab.style.display = 'block';
    navCenter.reset();
    filterNotes.apply({value: ""});
  }
}

sidemenu.addEventListener('click', function(event) {
  let clickedElem = event.target;
  let voices = sidemenu.children;

  if (clickedElem.nodeName == 'ASIDE') return;

  for (let v of voices) {
    v.classList.remove('sidemenu-active');
  }

  if (clickedElem.nodeName == 'SPAN') {
    clickedElem = clickedElem.parentElement;
  }

  switchTab(clickedElem.dataset.tab);

  clickedElem.classList.toggle('sidemenu-active');
});

/*
==========================================================

CAMBIO DI TEMA

==========================================================
*/

let root = document.querySelector(':root');
let switchThemeButton = document.getElementById('switchThemeButton');

switchThemeButton.addEventListener('click', function() {
  if (g_darkTheme) {
    root.style.setProperty('--selectedTab', '#FEEFC3');
    root.style.setProperty('--searchBar', '#eaeaea');
    root.style.setProperty('--searchBarHover', '#333');
    root.style.setProperty('--iconActive', '#333');
    root.style.setProperty('--iconNormal', '#666');
    root.style.setProperty('--iconBackground', '#dfdfdf');
    root.style.setProperty('--background', '#f9f9f9');
    root.style.setProperty('--textLight', '#222');
    root.style.setProperty('--textNormal', '#333');
    root.style.setProperty('--textDark', '#777');
    root.style.setProperty('--borders', '#ddd');
    root.style.setProperty('--selectedTabHover', '#eee');
    root.style.setProperty('--yellowNote', '#FFF275');
    createNoteArea.parentElement.style.boxShadow =
        '1px 2px 9px 1px rgba(76,76,76,0.22)';
  } else {
    root.style.setProperty('--selectedTab', '#41331C');
    root.style.setProperty('--searchBar', '#525355');
    root.style.setProperty('--searchBarHover', '#333');
    root.style.setProperty('--iconActive', '#eee');
    root.style.setProperty('--iconNormal', '#999');
    root.style.setProperty('--iconBackground', '#404040');
    root.style.setProperty('--background', '#222');
    root.style.setProperty('--textLight', '#fff');
    root.style.setProperty('--textNormal', '#ddd');
    root.style.setProperty('--textDark', '#bbb');
    root.style.setProperty('--borders', '#444');
    root.style.setProperty('--selectedTabHover', '#333');
    root.style.setProperty('--yellowNote', '#635D19');
    createNoteArea.parentElement.style.boxShadow = 'none';
  }

  g_darkTheme = !g_darkTheme;
});

/*
==========================================================

MENU LATERALE

==========================================================
*/

let menuButton = document.getElementById('menuButton');
let main = document.getElementsByTagName('main')[0];

menuButton.onclick = function() {
  if (g_sidemenuOpen) {
    sidemenu.style.left = '-270px';
    main.style.paddingLeft = '15px';
  } else {
    sidemenu.style.left = '0px';
    main.style.paddingLeft = '285px';
  }

  g_sidemenuOpen = !g_sidemenuOpen;
};

/*
==========================================================

CREA NUOVA NOTA

==========================================================
*/

function createNote(title, text) {
  let note = document.createElement('div');
  note.classList.add('note');

  let noteTitle = document.createElement('h3');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  let para = document.createElement('p');
  para.textContent = text;

  let controls = document.createElement("div");
  controls.classList.add("note__controls");

  controls.innerHTML = "<span class=\"material-icons note-icon archive-icon\">archive</span><span class=\"material-icons note-icon delete-icon\">delete</span>"

  note.appendChild(noteTitle);
  note.appendChild(para);
  note.appendChild(controls);

  return note;
}

let addNoteBtn = document.getElementById('addNote');

addNoteBtn.addEventListener('click', function() {
  let notes = getSection();
  let note = createNote('titolo', createNoteArea.value);

  notes.appendChild(note);

  createNoteArea.value = '';
  tippy(".archive-icon", {content: "Archivia", arrow: false, offset: [0, 5]});
  tippy(".delete-icon", {content: "Elimina", arrow: false, offset: [0, 5]});
});

/*
==========================================================

COMANDI NOTA

==========================================================
*/

function moveToTab(note, section) {
  note.remove();
  let sect = getSection(section);
  sect.appendChild(note);
}

center.addEventListener('click', function(e) {
  let icon = e.target;

  if (icon.nodeName == 'SPAN') {
    if (icon.classList.contains('delete-icon')) {
      let note = icon.parentElement.parentElement;
      moveToTab(note, "trash");
    } else if (icon.classList.contains('archive-icon')) {
      let note = icon.parentElement.parentElement;
      moveToTab(note, "archive");
    }
  }
})