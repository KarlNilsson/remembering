const todoModel = (() => {
    let _id = 0;
    const _todoMap = {};
    let _storage;

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
            category: args['category'],
        }
        _todoMap[_id] = todo;
        return todo;
    }

    const editTodo = (id, data) => {
        Object.keys(data).forEach(key => {
            _todoMap[id][key] = data[key];
        })
        return _todoMap[id];
    }

    const loadStorage = (storage) => {
        const todos = JSON.parse(storage['todo']);
        Object.keys(todos).forEach(key => {
            _id = Math.max(key, _id);
            todos[key].id = _id;
            _todoMap[_id] = todos[key];
        })
        return _todoMap;
    }

    const store = (storage=null) => {
        if (storage === null || _storage !== storage ) {
            _storage = storage;
        }
        _storage['todo'] = JSON.stringify(_todoMap);
    }

    const getTodo = (id) => {
        return _todoMap[id];
    }

    const deleteTodo = (id) => {
        _todoMap[id] = undefined;
    }

    const getTodoIds = () => {
        return Object.keys(_todoMap);
    }

    return { displayIndex, createTodo, editTodo, deleteTodo, loadStorage,
             getTodo, store, getTodoIds };
})();

const categoryModel = (() => {

    const addCategory = () => {};
    const editCategory = () => {};
    const deleteCategory = () => {};
    const addTodo = () => {};
    const removeTodo = () => {};

    return {
        addCategory, editCategory, deleteCategory, addTodo, removeTodo
    }
})();

export { todoModel, categoryModel };