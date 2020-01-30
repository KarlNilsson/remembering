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
        todoModel.loadStorage(localStorage);
        //1. Check localStorage for saved category objects (model)
        //2. Render (view)
    }

    const addTodo = () => {
        //0. Get currently active category (view)
        const categoryId = view.getActiveCategoryId();
        const callback = (formObj) => {
            formObj['categoryId'] = categoryId;
            const todo = todoModel.createTodo(formObj);
            _categories[categoryId][todo['id']] = todo;
            view.addTodo(todo, editTodo);
            todoModel.store(localStorage);
        };
        view.todoDialog(callback);
        document.querySelector('.todo-form-container').focus();
    }

    const editTodo = (todo) => {
        console.log(`Hello, world. My title is '${todo.title}'`)
        //0. Get currently active category (view)
        //0.5 Declare callback function (this)
        //1. Display pre-filled form (view)
        //2. On form submit, edit existing todo (model)
        //3. Update table with edited todo element (view)
    }

    const removeTodo = (todoId) => {
        //0. Get currently active category (view)
        //1. Delete todo from category todo list (model)
        //2. Delete todo from internal list (model)
        //3. Remove element from todo table (view)
    }

    return {
        addCategory, editCategory, deleteCategory, loadLocalStorage, addTodo,
        editTodo, removeTodo
    }

})()

export { remembering }