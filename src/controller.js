import { todoModel, categoryModel } from './remembering-model.js';
import { view } from './remembering-view.js';

const controller = (() => {

    const table = () => {
        return document.querySelector('table')
    };

    const activeCategory = () => {
        return document.querySelector('.category-item.active').id;
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

        // Add onclick event for all categories

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
                console.log(`Let's (un)check todo #${id}!`);
                todoModel.switchStatus(id);
                view.updateTodo(todoModel.getTodo(id));
                todoModel.store(localStorage);
            }
            else {
                console.log(`Let's edit todo #${id}`);
                const currentTodo = todoModel.getTodo(id);
                view.todoDialog((data) => {
                    data['category'] = activeCategory();
                    todoModel.editTodo(id, data);
                    view.updateTodo(currentTodo)
                }, currentTodo);
            }

        });
        
    }

    const addTodoListener = (todoId) => {

    };

    return { addInitialListeners };

})();

export { controller }