import { categoryFactory } from './category.js';
import { todoModel } from './remembering-model.js';
import { view } from './remembering-view.js';

const remembering = (() => {
    
    const _categories = {1: {}};

    const addCategory = () => {
        //0. Declare callback function (this)
        //1. Display empty category form (view)
        //2. On form submit, create new category (model)
        //3. Populate category list with new category element (view)
    }

    const editCategory = (categoryId) => {
        //0. Declare callback function (this)
        //1. Display pre-filled form (view)
        //2. On form submit, edit existing category (model)
        //3. Update list with edited category element (view)
    }

    const deleteCategory = (categoryId) => {
        //1. Delete category (model)
        //2. Remove element from category list (view)
    }

    const loadLocalStorage = () => {
        if (localStorage['todo'] === undefined) {
            localStorage['todo'] = JSON.stringify({});
        }
        const loaded = todoModel.loadStorage(localStorage);
        Object.keys(loaded).forEach(key => { 
            renderNewTodo(loaded[key]);
        })
    }

    const renderNewTodo = (todo) => {
        view.addTodo(todo, editTodo);
        view.setBinEvent(todo, 'click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        })
    }

    const reRenderTodo = (todo) => {
        view.updateTodo(todo);
    }

    const addTodo = () => {
        const category = view.getActiveCategoryId();
        const callback = (formObj) => {
            formObj['category'] = category;
            const todo = todoModel.createTodo(formObj);
            _categories[category][todo.id] = todo;
            renderNewTodo(todo);
            todoModel.store(localStorage);
        };
        view.todoDialog(callback);
    }

    const editTodo = (todo) => {
        const category = view.getActiveCategoryId();
        const callback = (formObj) => {
            formObj['category'] = category;
            const editedTodo = todoModel.editTodo(todo.id, formObj);
            _categories[category][editedTodo.id] = editedTodo;
            reRenderTodo(editedTodo);
            todoModel.store(localStorage);
        }
        view.todoDialog(callback, todo);
    }

    const deleteTodo = (todoId) => {
        //0. Get currently active category (view)
        const category = view.getActiveCategoryId();

        //1. Delete todo from category todo list (model)

        //2. Delete todo from internal list (model)
        todoModel.deleteTodo(todoId);
        todoModel.store(localStorage);

        //3. Remove element from todo table (view)
        view.deleteRow(todoId);
    }

    return {
        addCategory, editCategory, deleteCategory, loadLocalStorage, addTodo,
        editTodo, deleteTodo
    }

})()

export { remembering }