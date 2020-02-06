import { model } from './remembering-model.js';
import { view } from './remembering-view.js';

const controller = (() => {
    const initialize = () => {
        renderInitialView(model.getAllCategories());
        addInitialListeners();
    }

    const table = () => {
        return document.querySelector('table')
    };

    const activeCategoryId = () => {
        const category = document.querySelector('.category-item.active').id;
        return category.split('category-')[1];
    }

    const renderInitialView = (categories) => {
        // Render all categories
        Object.keys(categories).forEach(key => {
            view.addCategory(categories[key]);
        })

        const categoryElement = view.getActiveCategory();
        // Set active category
        view.setActiveCategory(categoryElement);
        // Load todos for active category
        if (categoryElement !== null) {
            const id = activeCategoryId();
            const todos = model.getCategory(id).todos;
            Object.keys(todos).forEach(key => {
                view.addTodo(todos[key]);
            });
        }
    }

    const addInitialListeners = () => {
        // Add new button listener
        const newTodoButton = document.querySelector(
            '.todo-container .remem-new-container'
        );
        newTodoButton.addEventListener('click', e => {
            if (Array.from(e.target.classList).includes('inactive')) {
                return;
            }
            const categoryId = activeCategoryId();
            view.todoDialog((data) => {
                data.category = categoryId;
                const todo = model.createTodo(data);
                view.addTodo(todo);
            })
        });

        const newCategoryButton = document.querySelector(
            '.category-container .remem-new-container'
        );
        newCategoryButton.addEventListener('click', () => {
            view.categoryDialog((data) => {
                const category = model.createCategory(data.category);
                view.addCategory(category);
            })
        })

        // Onclick for table elements
        table().addEventListener('click', e => {
            let row = e.target;

            while (!row.className.includes('todo-row')) {
                row = row.parentNode
                // Click was not on a row. Smile and wave
                if (row.localName === 'table') {
                    return;
                }
            }
            const id = row.id.split('todo-')[1];
            const className = e.target.className;

            if (className.includes('remem-bin')) {
                model.deleteTodo(id)
                view.deleteRow(id);
            } else if (className.includes('remem-done')) {
                const todo = model.getTodo(id);
                model.editTodo(id, { done: !todo.done });
                view.updateTodo(todo);
            } else {
                // If we click anywhere else on the todo, we want to edit it
                const currentTodo = model.getTodo(id);
                view.todoDialog((data) => {
                    data.category = activeCategoryId();
                    model.editTodo(id, data);
                    view.updateTodo(currentTodo)
                }, currentTodo);
            }
        });

        // Add onclick event for all categories
        const categoryList = document.querySelector('ul.category-list');
        categoryList.addEventListener('click', e => {
            let listItem = e.target;
            while (!listItem.className.includes('remem-list-item')) {
                if (listItem.localName === 'ul') {
                    // We clicked in the list, but not on any item
                    return;
                }
                listItem = listItem.parentNode;
            }

            const id = listItem.id.split('category-')[1];
            if (Array.from(listItem.classList).includes('active')) {
                const category = model.getCategory(id);
                view.categoryDialog((data) => {
                    if (data.action === 'submit') {
                        model.editCategory(id, data.category);
                        view.updateCategory(model.getCategory(id));
                    } else if (data.action === 'delete') {
                        model.deleteCategory(id);
                        view.deleteCategory(id);
                        const activeCategory = view.getActiveCategory();
                        if (activeCategory !== null) {
                            view.setActiveCategory(activeCategory);
                            view.storeActiveCategory();
                            const id = activeCategoryId();
                            const todos = model.getAllTodosForCategory(id);
                            view.clearTable();
                            Object.keys(todos).forEach(key => {
                                view.addTodo(todos[key]);
                            })
                        }
                    }
                }, category);
            } else {
                view.setActiveCategory(listItem);
                view.storeActiveCategory();
                const todos = model.getAllTodosForCategory(id);
                view.clearTable();
                Object.keys(todos).forEach(key => {
                    view.addTodo(todos[key]);
                })
            }
        });
    }

    return { initialize };
})();

export { controller }
