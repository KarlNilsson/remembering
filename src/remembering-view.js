import { todoView } from './todo-view.js';

const view = (() => {

    const createInput = ({name, id=name, type='text', content=''}) => {

        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');
        inputDiv.id = id;
    
        const inputElement = document.createElement('input');
        inputElement.classList.add('remem-input', 'general-text');
        inputElement.type = type;
        inputElement.id = id;
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
        labelElement.setAttribute('for', id);
        labelElement.innerHTML = name;
    
        inputDiv.appendChild(labelElement);
        inputDiv.appendChild(inputElement);
        return inputDiv;
    }

    const createCheckbox = ({name, id=name, content=false}) => {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('remem-input-div');
        inputDiv.id = id;
    
        const inputContainer = document.createElement('label');
        inputContainer.classList.add('remem-checkbox-container');
    
        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
    
        const customSpan = document.createElement('span');
        customSpan.classList.add('remem-checkbox');
        customSpan.addEventListener('click', e => {
            e.target.classList.toggle('active');
        });
    
        inputContainer.appendChild(inputElement);
        inputContainer.appendChild(customSpan);
        inputDiv.innerText = 'Priority';
        inputDiv.appendChild(inputContainer);
    
        return inputDiv;
    }

    const todoDialog = (callback, todo={}) => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.focus();

        const todoFormContainer = document.createElement('div');
        todoFormContainer.classList.add('todo-form-container', 'general-text');

    
        const todoForm = document.createElement('div');
        todoForm.classList.add('todo-form', 'general-text');
        todoFormContainer.appendChild(todoForm);
        
        const title = createInput({name: 'Title', content: todo['title']})
        const description = createInput({name: 'Description'})
        const dueDate = createInput({name: 'Due date', type: 'date', content: todo['dueDate']})
        const prio = createCheckbox({name: 'Priority', content: todo['prioritized']})

        todoForm.appendChild(title);
        todoForm.appendChild(description);
        todoForm.appendChild(dueDate);
        todoForm.appendChild(prio);
    
        const submitButton = document.createElement('button');
        submitButton.classList.add('remem-button', 'remem-input', 'general-text');
        submitButton.innerHTML = 'Submit';
        todoForm.appendChild(submitButton);
        submitButton.addEventListener('click', () => {
            callback(
            {
                title: title.querySelector('input').value,
                description: description.querySelector('input').value,
                dueDate: dueDate.querySelector('input').value,
                prio: Array.from(prio.querySelector('.remem-checkbox')
                        .classList).includes('checked')
            }
            );
            clearModal();
        });
        modalContainer.appendChild(todoFormContainer);
        
        modalContainer.style.visibility = 'visible';
        modalContainer.addEventListener('keyup', (e) => {
            if (event.key === 'Escape') {
                clearModal();
            }
        })
        modalContainer.focus();
    }

    const clearModal = () => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.style.visibility = 'hidden';
        Array.from(modalContainer.children).forEach((child) => {
            modalContainer.removeChild(child)
        });
    }

    const categoryDialog = () => {};
    
    const getActiveCategoryId = () => {
        return document.querySelector('.category-item.active').id;
    }

    const addTodo = (todo, clickEvent) => {
        const row = todoView.generateTodoElements(todo);
        row.addEventListener('click', () => {
            clickEvent(todo);
        })
        const table = document.querySelector('.todo-container table');
        table.appendChild(row);
    }

    const updateTodo = (todo) => {
        todoView.editTodoElement(todo);
    }

    return { todoDialog, getActiveCategoryId, addTodo, updateTodo }
})();

export { view }