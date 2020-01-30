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

    const store = (storage, id) => {
        storage['todo'] = JSON.stringify(_todoMap);
    }

    const getTodo = (id) => {
        return _todoMap[id];
    }

    return { displayIndex, createTodo, editTodo, loadStorage, getTodo, store };
})();

export { todoModel };