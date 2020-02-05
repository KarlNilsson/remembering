import { todoView } from './todo-view.js';
import { categoryView } from './category-view.js';
import { modalView } from './modal-view.js';
import 'icono';
import './style/style.css';

const view = (() => {
    let _activeCategory;
    let _activeCategoryId;
    let _storage = null;

    const storeActiveCategory = (storage = _storage) => {
        if (storage === null) {
            console.warn('No storage to save to');
            return;
        }
        storage.activeCategory = _activeCategoryId;
    }

    const loadStorage = (storage = _storage) => {
        if (storage === null) {
            console.warn('No storage to load from');
            return;
        }
        const storageCategory = storage.activeCategory;
        if (storageCategory === undefined) {
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

    const setNewTodoStatus = (status) => {
        const newContainer = document.querySelector(
            '.todo-container .remem-new-container'
        );
        const newButton = newContainer.querySelector('.icono-plus');
        if (status) {
            newContainer.classList.remove('inactive');
            newButton.classList.remove('inactive');
        } else {
            newContainer.classList.add('inactive');
            newButton.classList.add('inactive');
        }
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

    const todoDialog = (callback, todo = {}) => {
        const modalContainer = createModal();
        modalContainer.focus();

        const todoFormContainer = document.createElement('div');
        todoFormContainer.classList.add('form-container', 'general-text');

        const todoForm = document.createElement('div');
        todoForm.classList.add('form', 'general-text');
        todoFormContainer.appendChild(todoForm);

        modalContainer.appendChild(todoFormContainer);
        modalContainer.style.visibility = 'visible';

        const title = modalView.createInput('Title', todo.title);
        todoForm.appendChild(title);
        const description = modalView.createInput('Description', todo.description);
        todoForm.appendChild(description);
        const dueDate = modalView.createInput('Due date', todo.dueDate, 'date');
        todoForm.appendChild(dueDate);
        const prio = modalView.createCheckbox('Priority', todo.priority);
        todoForm.appendChild(prio);
        const done = modalView.createCheckbox('Done', todo.done);
        todoForm.appendChild(done);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('remem-btn-grid');
        todoForm.append(buttonDiv);

        const submitButton = modalView.createSubmitButton();
        buttonDiv.appendChild(submitButton);

        const cancelButton = modalView.createCancelButton();
        buttonDiv.append(cancelButton);

        const values = () => {
            return {
                title: title.querySelector('input').value,
                description: description.querySelector('input').value,
                dueDate: dueDate.querySelector('input').value,
                priority: Array.from(
                    prio.querySelector('.remem-checkbox').classList)
                    .includes('checked'),
                done: Array.from(
                    done.querySelector('.remem-checkbox').classList)
                    .includes('checked')
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
            } else if (e.key === 'Enter') {
                callback(values());
                clearModal();
            }
        });
        modalContainer.addEventListener('mousedown', (e) => {
            if (e.target === modalContainer) {
                clearModal();
            }
        });
        const input = title.querySelector('input')
        input.focus();
        input.scrollTo(0, 0);
    }

    const categoryDialog = (callback, category = {}) => {
        const modalContainer = createModal('category');
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

        const name = modalView.createInput('Name', category.name);
        categoryForm.append(name);

        const values = () => {
            return {
                category: {
                    name: name.querySelector('input').value
                }
            }
        };

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('remem-btn-grid');
        categoryForm.append(buttonDiv);

        const submitButton = modalView.createSubmitButton();
        buttonDiv.append(submitButton);

        submitButton.addEventListener('click', () => {
            const data = values();
            data.action = 'submit';
            callback(data)
            clearModal();
        });

        const cancelButton = modalView.createCancelButton();
        buttonDiv.append(cancelButton);
        cancelButton.addEventListener('click', () => {
            clearModal();
        });

        // Don't create delete button if new object
        if (Object.keys(category).length > 0) {
            const deleteButton = modalView.createDeleteButton();
            buttonDiv.append(deleteButton);
            deleteButton.addEventListener('click', () => {
                const data = values();
                data.action = 'delete';
                callback(data);
                clearModal();
            })
        }

        modalContainer.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                clearModal();
            } else if (e.key === 'Enter') {
                const data = values();
                data.action = 'submit';
                callback(data)
                clearModal();
            }
        });
        modalContainer.addEventListener('mousedown', (e) => {
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
        const classes = Array.from(modalContainer.classList);
        if (!(classes.includes('fade-out'))) {
            modalContainer.classList.add('fade-out');
            modalContainer.addEventListener('animationend', () => {
                if (modalContainer !== null) {
                    document.querySelector('body').removeChild(modalContainer);
                }
            });
        }
    }

    const getActiveCategory = () => {
        if (_activeCategory !== undefined && _activeCategory !== null) {
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

    const setActiveCategory = (listItem) => {
        if (listItem === null) {
            _activeCategory = null;
            setNewTodoStatus(false);
            return;
        }

        const activeCategory = getActiveCategory();
        if (activeCategory !== null) {
            activeCategory.classList.remove('active');
        } else {
            setNewTodoStatus(false);
        }
        listItem.classList.add('active');
        _activeCategory = listItem;
        _activeCategoryId = listItem.id.split('category-')[1];
        setNewTodoStatus(true);
        storeActiveCategory();
    }

    const addTodo = (todo) => {
        const row = todoView.generateTodoElements(todo);
        const table = document.querySelector('.todo-container table');
        table.appendChild(row);
    }

    const updateTodo = (todo) => {
        todoView.updateTodoElement(todo);
    }

    const addCategory = (category) => {
        const categoryList = document.querySelector('.category-list');
        const categoryItem = categoryView.addCategory(category);
        categoryList.appendChild(categoryItem);
        clearTable();
        setActiveCategory(categoryItem);
    }

    const updateCategory = (category) => {
        categoryView.editCategoryElement(category);
    }

    const deleteCategory = (id) => {
        categoryView.deleteCategoryElement(id);
        setActiveCategory(null);
    }

    const deleteRow = (id) => {
        const table = document.querySelector('.remem-list-container table');
        const row = table.querySelector(`tr#todo-${id}`);
        table.removeChild(row);
    }

    const createModal = (type) => {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container', type);
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
        storeActiveCategory,
        loadStorage,
        setStorage,
        getStorage,
        initializeView,
        todoDialog,
        categoryDialog,
        getActiveCategory,
        setActiveCategory,
        addTodo,
        updateTodo,
        deleteRow,
        addCategory,
        updateCategory,
        deleteCategory,
        clearTable
    }
})();

export { view }
