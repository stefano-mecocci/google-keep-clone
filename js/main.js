import {Note} from './Note.js';

let $darkTheme = true;
let $currentTab = "notes";

let closeNotificationBtn = document.getElementById("closeNotificationBtn");
let notificationText = closeNotificationBtn.parentElement.firstElementChild;
let notify = closeNotificationBtn.parentElement;

closeNotificationBtn.addEventListener("click", function() {
  notify.style.opacity = "0%";
  notify.style.visibility = "hidden";
});

function sendNotify(message) {
  notificationText.textContent = message;

  notify.style.visibility = "visible";
  notify.style.opacity = "100%";
}

/*
=====================================================

ANIMAZIONE BARRA DI RICERCA

=====================================================
*/
let deleteBtn = document.getElementById('deleteBtn');
let searchBtn = document.getElementById('searchBtn');
let searchForm = deleteBtn.parentElement;
let searchInput = searchForm.children[1];
let formClicked = false;

function toggleSearchformStyle() {
  searchForm.classList.toggle('search-active');

  deleteBtn.classList.toggle('visible');

  if (searchBtn.classList.contains('md-lighter')) {
    searchBtn.classList.replace('md-lighter', 'md-darker');
    deleteBtn.classList.replace('md-lighter', 'md-darker');
  } else {
    searchBtn.classList.replace('md-darker', 'md-lighter');
    deleteBtn.classList.replace('md-darker', 'md-lighter');
  }
}

document.addEventListener('click', function(event) {
  if (searchForm.contains(event.target)) {
    if (!formClicked) {
      toggleSearchformStyle();
      formClicked = true;
    }
  } else {
    if (formClicked) {
      formClicked = false;
      toggleSearchformStyle();
    }
  }
});


/*
=====================================================

ANIMAZIONE MENU LATERALE

=====================================================
*/
let sidebar = document.getElementsByTagName('aside')[0];
let menuBtn = document.getElementById('menuBtn');
let main = document.getElementsByTagName('main')[0];
let isMenuOpen = true;

if (window.innerWidth > 700) {
  sidebar.classList.add("sidebar-open");
} else {
  isMenuOpen = false;
}

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');

  if (window.innerWidth > 700) {
    main.classList.toggle('sidebar-open');
  }

  isMenuOpen = !isMenuOpen;

  if (isMenuOpen && window.innerWidth < 700) {
    searchForm.style.opacity = "0%";
  } else {
    searchForm.style.opacity = "100%";
  }
});

function enlargeMenu() {
  if (window.innerWidth > 700 && !isMenuOpen) {
    sidebar.classList.toggle('sidebar-closed');
    main.classList.toggle('sidebar-closed');
  }
}

sidebar.addEventListener('mouseenter', enlargeMenu);
sidebar.addEventListener('mouseleave', enlargeMenu);


/*
=====================================================

FUNZIONALITA BARRA DI RICERCA

=====================================================
*/
deleteBtn.addEventListener('click', () => {
  searchForm.reset();
});


/*
=====================================================

TOOLTIPS

=====================================================
*/
const ids = [
  ['#menuBtn', 'Menu'], ['#searchBtn', 'Cerca'], ['#deleteBtn', 'Cancella'],
  ['#darkThemeBtn', 'Cambia tema'], ['#changeLayoutBtn', 'Layout'],
  ['#settingsBtn', 'Impostazioni']
];

for (const id of ids) {
  tippy(id[0], {content: id[1], arrow: false, offset: [0, 5], touch: false});
}


/*
=====================================================

ADD NEW NOTE

=====================================================
*/
let createNoteForm = document.getElementById('createNoteForm');
let createNoteTextField = createNoteForm['text'];

function adjustTextarea() {
  createNoteTextField.style.height = 0;
  createNoteTextField.style.height = (createNoteTextField.scrollHeight) + 'px';
}

createNoteTextField.addEventListener('input', adjustTextarea);
window.addEventListener('resize', adjustTextarea);

function addNoteTo(note, tab) {
    let notesTab = document.getElementById(tab + 'Tab').lastElementChild;
    notesTab.appendChild(note.build());
}

createNoteForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = createNoteForm['title'].value.trim();
  const text = createNoteTextField.value.trim();

  if (title != '' && text != '') {
    let note = new Note(title, text);
    addNoteTo(note, "notes");
    createNoteForm.reset();
  } else {
    sendNotify("Manca il titolo o il testo");
  }
});


/*
=====================================================

CAMBIA LAYOUT

=====================================================
*/
let changeLayoutBtn = document.getElementById('changeLayoutBtn');

changeLayoutBtn.addEventListener('click', function() {
  let notez = document.querySelectorAll('.note');
  let notes = document.getElementById($currentTab + 'Tab').lastElementChild;

  notes.classList.toggle('one-column');

  for (let n of notez) {
    n.classList.toggle('one-column');
  }

  if (this.textContent == 'grid_view') {
    this.textContent = 'view_agenda';
  } else {
    this.textContent = 'grid_view';
  }
})


/*
=====================================================

SIDEBAR TAB SWITCH

=====================================================
*/
sidebar.addEventListener('click', function(event) {
  let elem = event.target;
  let tabs = document.querySelectorAll('.tab');

  if (event.target.nodeName == 'SPAN') {
    elem = elem.parentElement;
  }

  if (elem.classList.contains('menu__entry')) {
    for (let voice of this.children) {
      voice.classList.remove('selected-entry');
      voice.firstElementChild.classList.replace('md-lighter', 'md-light');
    }

    elem.classList.add('selected-entry');
    elem.firstElementChild.classList.replace('md-light', 'md-lighter');

    for (let tab of tabs) {
      tab.style.display = 'none';
    }

    /* TMP */
    if (elem.dataset.tab != 'filter') {
      let tabToDisplay = document.getElementById(elem.dataset.tab + 'Tab');
      tabToDisplay.style.display = 'flex';
    }
  }
});


/*
=====================================================

CAMBIO DI TEMA

=====================================================
*/
let darkThemeBtn = document.getElementById('darkThemeBtn');
let darkThemeBtnMobile = document.getElementById('darkThemeBtnMobile');
let root = document.querySelector(':root');

const LIGHT_THEME = {
  '--bgDark4': '#fdfdfd',
  '--bgDark3': '#f1f3f4',
  '--bgDark2': '#eaeaea',
  '--bgDark1': '#eee',
  '--bgLight1': '#ddd',
  '--bgLight2': '#eee',
  '--textLight2': '#222',
  '--textDark1': '#666',
  '--borders': '#ddd',
  '--textLight3': '#292929',
  '--selectedTab': '#FEEFC3',
  '--yellowNote': '#FFF475'
};

const DARK_THEME = {
  '--bgLight3': '#fff',
  '--bgLight2': '#eee',
  '--bgLight1': '#ccc',
  '--bgDark1': '#555',
  '--bgDark2': '#404040',
  '--bgDark3': '#333',
  '--bgDark4': '#222',
  '--borders': '#555',
  '--yellowNote': '#635D19',
  '--selectedTab': '#41331C',
  '--textLight3': '#eee',
  '--textLight2': '#ddd',
  '--textLight1': '#aaa',
  '--textDark1': '#888',
  '--textDark2': '#515151',
  '--textDark3': '#222'
};

function switchTheme() {
  if ($darkTheme) {
    for (let prop in LIGHT_THEME) {
      root.style.setProperty(prop, LIGHT_THEME[prop]);
    }
  } else {
    for (let prop in DARK_THEME) {
      root.style.setProperty(prop, DARK_THEME[prop]);
    }
  }

  $darkTheme = !$darkTheme;
}

darkThemeBtn.addEventListener('click', switchTheme);
darkThemeBtnMobile.addEventListener('click', switchTheme);
