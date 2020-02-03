import { todoView } from './todo-view.js';
import { categoryView } from './category-view.js';
import './style/style.css';
import 'icono';

const view = (() => {

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

    
        const submitButton = document.createElement('button');
        submitButton.classList.add('remem-button', 'remem-input', 'general-text');
        submitButton.innerHTML = 'Submit';
        todoForm.appendChild(submitButton);
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

        modalContainer.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                clearModal();
            }
            else if (event.key === 'Enter') {
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

        const submitButton = createSubmitButton();
        categoryForm.append(submitButton);

        const values = () => {
            return { name: name.querySelector('input').value }
        };
        
        submitButton.addEventListener('click', () => {
            callback(values());
            clearModal();
        });

        modalContainer.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                clearModal();
            }
            else if (event.key === 'Enter') {
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
            document.querySelector('body').removeChild(modalContainer);
        }
    }

    const createSubmitButton = () => {
        const submitButton = document.createElement('button');
        submitButton.classList.add('remem-button', 'remem-input', 'general-text');
        submitButton.innerHTML = 'Submit';
        return submitButton;
    }
    
    const getActiveCategoryId = () => {
        return document.querySelector('.category-item.active').id;
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
        const listItem = categoryView.createCategory(category);
        const list = document.querySelector('ul.remem-list');
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

    return {
        initializeView, todoDialog, categoryDialog, getActiveCategoryId,
        addTodo, updateTodo, deleteRow, updateCategory
    }
})();

export { view }