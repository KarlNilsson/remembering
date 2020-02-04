import { model, todoModel, categoryModel } from './remembering-model.js';
import { view } from './remembering-view.js';

const controller = (() => {

    const table = () => {
        return document.querySelector('table')
    };

    const activeCategory = () => {
        return document.querySelector('.category-item.active').id;
    }

    const initialize = () => {
        renderInitialView(model.getAllCategories());
        addInitialListeners();

    }

    const renderInitialView = (categories) => {
        // Render all categories
        Object.keys(categories).forEach(key => {
            view.addCategory(categories[key]);
        })

        // Set active category
        view.setActiveCategory(view.getActiveCategory());

        // Load todos for active category
        const id = view.getActiveCategory().id.split('category-')[1];
        const todos = model.getCategory(id)['todos'];
        Object.keys(todos).forEach(key => {
            view.addTodo(todos[key]);
        });

    }

    // This doesn't create the model. What's going on?!
    const createModelFromStorage = (storage) => {
        if (storage['todo'] === undefined) {
            storage['todo'] = JSON.stringify({});
        }
        // Load categories
        if (storage['category'] === undefined) {
            storage['category'] = JSON.stringify({});
        }

        Object.keys(storage['category']).forEach(key => {
            view.addCategory(storage['category'][key]);
        })
        // Set active category (last active category from localStorage)
        view.setActiveCategory(view.getActiveCategory());

        // Change this to be todos for current active category
        Object.keys(storage['todo']).forEach(key => { 
            view.addTodo(storage['todo'][key]);
        })
    }

    const addInitialListeners = () => {
        // Add new button listener
        const newTodoButton = document.querySelector(
            '.todo-container .remem-new-container'
        );
        newTodoButton.addEventListener('click', () => {
            const categoryId = activeCategory().split('category-')[1];
            view.todoDialog((data) => {
                data['category'] = categoryId;
                const todo = model.createTodo(data);
                model.store();
                view.addTodo(todo);
            })
        });

        const newCategoryButton = document.querySelector(
            '.category-container .remem-new-container'
        );
        newCategoryButton.addEventListener('click', () => {
            view.categoryDialog((data) => {
                const category = categoryModel.createCategory(data);
                model.store();
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
                const category = activeCategory();
                model.deleteTodo(id)
                model.store();
                view.deleteRow(id);

            }
            else if (className.includes('remem-done')) {
                todoModel.switchStatus(id);
                view.updateTodo(todoModel.getTodo(id));
                model.store();
            }
            // If we click anywhere else on the todo, we want to edit it
            else {
                const currentTodo = todoModel.getTodo(id);
                view.todoDialog((data) => {

                    data['category'] = activeCategory();
                    todoModel.editTodo(id, data);
                    view.updateTodo(currentTodo)
                    model.store();
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
                const category = categoryModel.getCategory(id);
                view.categoryDialog((data) => {
                    categoryModel.editCategory(id, data);
                    view.updateCategory(categoryModel.getCategory(id));
                    model.store();
                }, category);
            }
            else {
                view.setActiveCategory(listItem);
                view.storeActiveCategory();
                const todos = categoryModel.getAllTodos(id);
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