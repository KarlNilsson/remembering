import { todoView } from './todo-view.js';
import { categoryView } from './category-view.js';
import 'icono';
import './style/style.css';

const view = (() => {

    let _activeCategory;
    let _activeCategoryId;
    let _storage = null;

    const storeActiveCategory = (storage=_storage) => {
        if (storage === null ) {
            console.warn('No storage to load from');
            return;
        }
        storage.activeCategory = _activeCategoryId;
    }

    const loadStorage = (storage=_storage) => {
        if (storage === null) {
            console.warn('No storage to load from');
            return;
        }
        _activeCategoryId = JSON.parse(storage.activeCategory);
    }

    const setStorage = (storage) => {
        _storage = storage;
    }

    const getStorage = () => {
        return _storage;
    }

    const initializeView = () => {
        const body = document.querySelector('body');
        const headerContainer = createHeaderContainer();
        body.appendChild(headerContainer);
        const contentGridContainer = createContentGridContainer();
        body.appendChild(contentGridContainer);
        const contentGrid = createContentGrid();
        contentGridContainer.appendChild(contentGrid);
        const categoryList = categoryView.createCategoryList();
        contentGrid.appendChild(categoryList);
        const todo = todoView.createTodoTable();
        contentGrid.appendChild(todo);
        
    }

    const createHeaderContainer = () => {
        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
        const h1 = document.createElement('h1');
        h1.classList.add('general-text');
        h1.innerHTML = 'Remembering';
        headerContainer.appendChild(h1);
        return headerContainer;
    }

    const createContentGridContainer = () => {
        const contentGridContainer = document.createElement('div');
        contentGridContainer.id = 'content-grid-container';
        return contentGridContainer;
    }

    const createContentGrid = () => {
        const contentGrid = document.createElement('div');
        contentGrid.classList.add('content-grid');
        return contentGrid;
    }

    const createInput = (name, content='', type='text') => {

        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');
        inputDiv.id = name;
    
        const inputElement = document.createElement('input');
        inputElement.classList.add('remem-input', 'general-text');
        inputElement.type = type;
        inputElement.id = name;
        if (content !== '') {
            inputElement.value = content;
        }
        else if (type === 'date') {
            const date = new Date();
            inputElement.value = date.getFullYear().toString() +
            '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
            '-' + date.getDate().toString().padStart(2, 0);
        }
    
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', name);
        labelElement.innerHTML = name;
    
        inputDiv.appendChild(labelElement);
        inputDiv.appendChild(inputElement);
        return inputDiv;
    }

    const createCheckbox = (name, content=false) => {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('remem-input-div');
        inputDiv.id = name;
    
        const inputContainer = document.createElement('label');
        inputContainer.classList.add('remem-checkbox-container');
    
        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
    
        const customSpan = document.createElement('span');
        customSpan.classList.add('remem-checkbox');
        if (content) {
            customSpan.classList.add('checked');
        }
        customSpan.addEventListener('click', e => {
            e.target.classList.toggle('checked');
        });
    
        inputContainer.appendChild(inputElement);
        inputContainer.appendChild(customSpan);
        inputDiv.innerText = name;
        inputDiv.appendChild(inputContainer);
    
        return inputDiv;
    }

    const todoDialog = (callback, todo={}) => {
        const modalContainer = createModal();
        modalContainer.focus();

        const todoFormContainer = document.createElement('div');
        todoFormContainer.classList.add('form-container', 'general-text');

        const todoForm = document.createElement('div');
        todoForm.classList.add('form', 'general-text');
        todoFormContainer.appendChild(todoForm);

        modalContainer.appendChild(todoFormContainer);
        modalContainer.style.visibility = 'visible';
        
        const title = createInput('Title', todo['title']);
        todoForm.appendChild(title);
        const description = createInput('Description', todo['description']);
        todoForm.appendChild(description);
        const dueDate = createInput('Due date', todo['dueDate'], 'date',);
        todoForm.appendChild(dueDate);
        const prio = createCheckbox('Priority', todo['priority']);
        todoForm.appendChild(prio);
        const done = createCheckbox('Done', todo['done']);
        todoForm.appendChild(done);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('remem-btn-grid');
        todoForm.append(buttonDiv);

        const submitButton = createSubmitButton();
        buttonDiv.appendChild(submitButton);

        const cancelButton = createCancelButton();
        buttonDiv.append(cancelButton);


        const values = () => {
            return {
                title: title.querySelector('input').value,
                description: description.querySelector('input').value,
                dueDate: dueDate.querySelector('input').value,
                priority: Array.from(prio.querySelector('.remem-checkbox')
                        .classList).includes('checked'),
                done: Array.from(done.querySelector('.remem-checkbox')
                        .classList).includes('checked')
            }
        };
        submitButton.addEventListener('click', () => {
            callback(values());
            clearModal();
        });

        cancelButton.addEventListener('click', () => clearModal());

        modalContainer.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                clearModal();
            }
            else if (e.key === 'Enter') {
                callback(values());
                clearModal();
            }
        });
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                clearModal();
            }
        });
        const input = title.querySelector('input')
        input.focus();
        input.scrollTo(0, 0);
    }

    const categoryDialog = (callback, category={}) => {
        const modalContainer = createModal();
        modalContainer.focus();

        const categoryFormContainer = document.createElement('div');
        categoryFormContainer.classList.add(
            'form-container', 'general-text'
        );

        modalContainer.appendChild(categoryFormContainer);
        modalContainer.style.visibility = 'visible';

        const categoryForm = document.createElement('div');
        categoryForm.classList.add('form', 'general-text');
        categoryFormContainer.appendChild(categoryForm);

        const name = createInput('Name', category['name']);
        categoryForm.append(name);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('remem-btn-grid');
        categoryForm.append(buttonDiv);

        const submitButton = createSubmitButton();
        buttonDiv.append(submitButton);

        const cancelButton = createCancelButton();
        buttonDiv.append(cancelButton);

        const values = () => {
            return { name: name.querySelector('input').value }
        };
        
        submitButton.addEventListener('click', () => {
            callback(values())
            clearModal();
        });

        cancelButton.addEventListener('click', () => {
            clearModal();
        });

        modalContainer.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                clearModal();
            }
            else if (e.key === 'Enter') {
                callback(values());
                clearModal();
            }
        });
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                clearModal();
            }
        });

        const input = name.querySelector('input')
        input.focus();
        input.scrollTo(0, 0);
    }

    const clearModal = () => {
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer !== null) {
            modalContainer.classList.add('fade-out');
            modalContainer.addEventListener('animationend', () => {
                document.querySelector('body').removeChild(modalContainer);
            });
        }
    }

    const createSubmitButton = () => {
        const submitButton = document.createElement('button');
        submitButton.classList.add('remem-button', 'remem-input', 'general-text');
        submitButton.innerHTML = 'Submit';
        return submitButton;
    }

    const createCancelButton = () => {
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('remem-button', 'remem-input', 'general-text');
        cancelButton.innerHTML = 'Cancel';
        return cancelButton;
    }
    
    const getActiveCategory = () => {
        if (_activeCategory !== undefined) {
            return _activeCategory;
        }

        const activeCategory = document.querySelector(
            `.category-item#category-${_activeCategoryId}`
        );
        if (activeCategory === null) {
            return document.querySelector('.category-item');
        }
        return activeCategory;
    }

    const setActiveCategory = (listItem=null) => {
        const activeCategory = getActiveCategory();
        activeCategory.classList.remove('active');
        listItem.classList.add('active');
        _activeCategory = listItem;
        _activeCategoryId = listItem.id.split('category-')[1];
    }

    // Move to todo-view
    const addTodo = (todo) => {
        const row = todoView.generateTodoElements(todo);
        const table = document.querySelector('.todo-container table');
        table.appendChild(row);
    }

    const updateTodo = (todo) => {
        todoView.editTodoElement(todo);
    }

    const addCategory = (category) => {
        const categoryList = document.querySelector('.category-list');
        const categoryItem = categoryView.addCategory(category);
        categoryList.appendChild(categoryItem);
    }

    const updateCategory = (category) => {
        categoryView.editCategoryElement(category);
    }

    const deleteRow = (id) => {
        const table = document.querySelector('.remem-list-container table');
        const row = table.querySelector(`tr#todo-${id}`);
        table.removeChild(row);
    }

    const createModal = () => {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.tabIndex = 0;
        document.querySelector('body').appendChild(modalContainer);
        return modalContainer;
    }

    const clearTable = () => {
        const table = document.querySelector('table');
        const rows = Array.from(table.querySelectorAll('.todo-row'));
        rows.forEach(node => table.removeChild(node));
    }

    return {
        storeActiveCategory, loadStorage, setStorage, getStorage,
        loadStorage, initializeView, todoDialog, categoryDialog,
        getActiveCategory, setActiveCategory, addTodo, updateTodo, deleteRow,
        addCategory, updateCategory, clearTable
    }
})();

export { view }