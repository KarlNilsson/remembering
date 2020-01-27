import './style/style.css';

const body = document.querySelector('body');

// Header container
const headerContainer = document.createElement('div');
headerContainer.id = 'header-container';
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
const item1 = document.createElement('li');
item1.classList.add('remem-list-item', 'category-item', 'active');
item1.innerHTML = 'I\'m a category';
categoryList.appendChild(item1);

    // Todo list
const todoListContainer = document.createElement('div');
todoListContainer.classList.add('remem-list-container', 'todo-container');
const todoListH2 = document.createElement('h2');
todoListH2.classList.add('general-text');
todoListH2.innerHTML = "Current todos";
todoListContainer.appendChild(todoListH2);

const todoList = document.createElement('ul');
todoList.classList.add('remem-list', 'todo-list', 'general-text');
const item2 = document.createElement('li');
item2.classList.add('remem-list-item', 'todo-item');
item2.innerHTML = '<span>I\'m a todo</span>';
todoList.appendChild(item2);

const item3 = document.createElement('li');
item3.classList.add('remem-list-item', 'todo-item');
item3.innerHTML = '<span>I\'m a todo with a lot of a lot of a text</span>';
todoList.appendChild(item3);

categoryListContainer.appendChild(categoryList);
contentGrid.appendChild(categoryListContainer);
todoListContainer.appendChild(todoList);
contentGrid.appendChild(todoListContainer);

contentGridContainer.appendChild(contentGrid);
body.appendChild(contentGridContainer)