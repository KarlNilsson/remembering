import './style/style.css';
import { createCategory } from './category.js';
import { todoView } from './todo-view.js';
import { remembering } from './remembering.js';
import 'icono';
import { controller } from './controller.js'

const body = document.querySelector('body');

// Header container
const headerContainer = document.createElement('div');
headerContainer.classList.add('header-container');
const h1 = document.createElement('h1');
h1.classList.add('general-text');
h1.innerHTML = 'Remembering';
headerContainer.appendChild(h1);
body.appendChild(headerContainer);


// Content grid
const contentGridContainer = document.createElement('div');
contentGridContainer.id = 'content-grid-container';
const contentGrid = document.createElement('div');
contentGrid.classList.add('content-grid');

// Category list
const categoryListContainer = document.createElement('div');
categoryListContainer.classList.add(
    'remem-list-container', 'category-container'
    );
const categoryList = document.createElement('ul');
categoryList.classList.add('remem-list', 'category-list', 'general-text');
const categoryItem1 = createCategory('I\'m a category');
categoryList.appendChild(categoryItem1);
categoryListContainer.appendChild(categoryList);
contentGrid.appendChild(categoryListContainer);

// Todo list
const todoTableContainer = document.createElement('div');
todoTableContainer.classList.add(
    'remem-list-container', 'todo-container', 'general-text'
    );
const todoTable = document.createElement('table');
todoTableContainer.appendChild(todoTable);

const header = todoView.generateTableHeader();
todoTable.appendChild(header);
contentGrid.appendChild(todoTableContainer);

const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
modalContainer.tabIndex = 0;

body.appendChild(modalContainer);

contentGridContainer.appendChild(contentGrid);
body.appendChild(contentGridContainer);

remembering.loadLocalStorage();
controller.addInitialListeners();