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
        const storage = model.getStorage();
        createFromStorage(storage);
        addInitialListeners();

    }

    const createFromStorage = (storage) => {
        if (storage['todo'] === undefined) {
            storage['todo'] = JSON.stringify({});
        }
        // Load categories
        // Set active category

        // Change this to be todos for current active category
        Object.keys(storage['todo']).forEach(key => { 
            view.addTodo(storage['todo'][key]);
        })
    }

    const addInitialListeners = () => {
        // Add new button listener
        const newButton = document.querySelector('.remem-new-container');
        newButton.addEventListener('click', () => {
            const category = activeCategory();
            view.todoDialog((data) => {
                data['category'] = category;
                const todo = todoModel.createTodo(data);
                todoModel.store(localStorage);
                view.addTodo(todo);
            })
        });



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
                todoModel.deleteTodo(id);
                todoModel.store(localStorage);
                view.deleteRow(id);

            }
            else if (className.includes('remem-done')) {
                todoModel.switchStatus(id);
                view.updateTodo(todoModel.getTodo(id));
                todoModel.store(localStorage);
            }
            // If we click anywhere else on the todo, we want to edit it
            else {
                const currentTodo = todoModel.getTodo(id);
                view.todoDialog((data) => {

                    data['category'] = activeCategory();
                    todoModel.editTodo(id, data);
                    view.updateTodo(currentTodo)
                    todoModel.store(localStorage);
                }, currentTodo);
            }

        });
        
        // Add onclick event for all categories
        const category = document.querySelector('.remem-list-item');
        category.addEventListener('click', e => {
            view.categoryDialog((data) => {
                const id = category.id.split('category-')[1];
                categoryModel.editCategory(id, data);
                view.updateCategory(categoryModel.getCategory(id));
                categoryModel.store(localStorage);
            });
        })
    }

    const addTodoListener = (todoId) => {

    };

    return { initialize };

})();

export { controller }