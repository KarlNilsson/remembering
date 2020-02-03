const todoModel = (() => {
    let _id = 0;
    const _todoMap = {};

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

    const store = (storage) => {
        storage['todo'] = JSON.stringify(_todoMap);
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
    
    const getAllTodos = () => {
        return _todoMap;
    }

    return { displayIndex, createTodo, editTodo, deleteTodo, loadStorage,
             getTodo, store, getTodoIds, switchStatus, getAllTodos };
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

    const loadStorage = (storage) => {
        const categories = JSON.parse(storage['category']);
        Object.keys(categories).forEach(key => {
            _id = Math.max(key, _id);
            categories[key].id = _id;
            _categoryMap[_id] = categories[key];
        })
        return _categoryMap;
    }

    const store = (storage) => {
        storage['category'] = JSON.stringify(_categoryMap);
    }

    const createCategory = (data) => {
        const newCategory = category(data['name']);
        _categoryMap[_id] = newCategory;
        return newCategory;
    }

    const editCategory = (id, data) => {
        Object.keys(data).forEach(key => {
            _categoryMap[id][key] = data[key];
        });
    };

    const deleteCategory = (id) => {
        _categoryMap[id] = undefined;
    };

    const getCategory = (id) => {
        return _categoryMap[id];
    }

    const addTodo = (categoryId, todoId) => {
        _categoryMap[categoryId].todos[todoId] = todoModel.getTodo(todoId);
    };

    const removeTodo = (categoryId, todoId) => {
        _categoryMap[categoryId].todos[todoId] = undefined;
    };

    const getAllTodos = (categoryId) => {
        return _categoryMap[categoryId].todos;
    }

    const getAllCategories = () => {
        return _categoryMap;
    }

    return {
        createCategory, editCategory, deleteCategory, addTodo, removeTodo,
        getAllTodos, getCategory, getAllCategories, loadStorage, store
    }
})();

const model = (() => {
    let _storage = null;

    const loadStorage = () => {
        if (_storage === null) {
            console.warn('No storage to load from');
            return;
        }
        todoModel.loadStorage(_storage);
        categoryModel.loadStorage(_storage);
    }

    const getStorage = () => {
        if (_storage === null) {
            console.warn('No storage available');
            return;
        }
        return {
            category: categoryModel.getAllCategories(),
            todo: todoModel.getAllTodos()
        };
    }

    const setStorage = (storage) => {
        _storage = storage;
    }

    const store = (storage=_storage) => {
        if (_storage === null) {
            console.warn('No storage to write to');
            return;
        }
        todoModel.store(storage);
        categoryModel.store(storage);
    }
    return { loadStorage, getStorage, setStorage, store }
})();

export { model, todoModel, categoryModel };