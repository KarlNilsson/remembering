import { todoView } from './todo-view.js';

const view = (() => {

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
        todoFormContainer.classList.add('todo-form-container', 'general-text');

        const todoForm = document.createElement('div');
        todoForm.classList.add('todo-form', 'general-text');
        todoFormContainer.appendChild(todoForm);
        
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
        modalContainer.appendChild(todoFormContainer);
        
        modalContainer.style.visibility = 'visible';
        modalContainer.addEventListener('keyup', (e) => {
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

    const clearModal = () => {
        const modalContainer = document.querySelector('.modal-container');
        document.querySelector('body').removeChild(modalContainer);
    }

    const categoryDialog = () => {};
    
    const getActiveCategoryId = () => {
        return document.querySelector('.category-item.active').id;
    }

    const addTodo = (todo) => {
        const row = todoView.generateTodoElements(todo);
        const table = document.querySelector('.todo-container table');
        table.appendChild(row);
    }

    const updateTodo = (todo) => {
        todoView.editTodoElement(todo);
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
        todoDialog, getActiveCategoryId, addTodo, updateTodo, deleteRow
    }
})();

export { view }