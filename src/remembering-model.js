const todoModel = (() => {
    let _id = 0;
    const _todoMap = {};
    let _storage;

    const displayIndex = () => {
        console.log(_id);
    };

    const createTodo = (data) => {
        const todo = {
            id: ++_id,
            title: data['title'],
            description: data['description'],
            dueDate: data['dueDate'],
            priority: data['priority'],
            done: false,
            category: data['category'],
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

    const switchStatus = (id) => {
        _todoMap[id].done = !_todoMap[id].done;
        return _todoMap[id];
    }

    return { displayIndex, createTodo, editTodo, deleteTodo, loadStorage,
             getTodo, store, getTodoIds, switchStatus };
})();

const categoryModel = (() => {

    let _id = 0;
    const _categoryMap = {};
    const category = (name) => {
        return {
            id: ++_id,
            name: name,
            todos: {}
        }
    }

    const addCategory = (data) => {
        const newCategory = category(data['name']);
        _categoryMap[_id] = newCategory;
    }

    const editCategory = (id, data) => {
        Object.keys(data).forEach(key => {
            _categoryMap[id][key] = data[key];
        });
    };

    const deleteCategory = (id) => {
        _categoryMap[id] = undefined;
    };

    const addTodo = (categoryId, todoId) => {
        _categoryMap[categoryId].todos[todoId] = todoModel.getTodo(todoId);
    };

    const removeTodo = (categoryId, todoId) => {
        _categoryMap[categoryId].todos[todoId] = undefined;
    };

    const getAllTodos = (categoryId) => {
        return _categoryMap[categoryId].todos;
    }

    return {
        addCategory, editCategory, deleteCategory, addTodo, removeTodo,
        getAllTodos
    }
})();

export { todoModel, categoryModel };