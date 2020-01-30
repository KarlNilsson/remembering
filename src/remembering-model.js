// TODO (ironically): Add eventlisteners to todos, to expand them on click
// in order to edit their attributes.

import { view } from './remembering-view.js';

const todoModel = (() => {
    let _id = 0;
    const _todoMap = {};

    const displayIndex = () => {
        console.log(_id);
    };

    const createTodo = (args) => {
        const todo = {
            id: ++_id,
            title: args['title'],
            description: args['description'],
            dueDate: args['dueDate'],
            priority: args['priority'],
            done: false,
            category: args['categoryId'],
        }
        _todoMap[_id] = todo;
        return todo;
    }

    const loadStorage = (storage) => {
        const todos = JSON.parse(storage['todo']);
        Object.keys(todos).forEach(key => {
            _id = Math.max(key, _id);
            todos[key].id = _id;
            _todoMap[_id] = todos[key];
            view.addTodo(_todoMap[_id]);
        })
    }

    const store = (storage, id) => {
        debugger;
        storage['todo'] = JSON.stringify(_todoMap);
    }

    const getTodo = (id) => {
        return _todoMap[id];
    }

    return { displayIndex, createTodo, loadStorage, getTodo, store };
})();

export { todoModel };