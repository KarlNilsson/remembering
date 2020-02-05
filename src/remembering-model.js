const todoModel = (() => {
    let _id = 0;
    const _todoMap = {};

    const createTodo = (data) => {
        // Set _id to the highest available ID + 1. We don't reuse.
        _id = Math.max(Math.max(...Object.keys(_todoMap)) + 1, 0);
        const todo = {
            id: _id,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            priority: data.priority,
            done: false,
            category: data.category,
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
        const todos = JSON.parse(storage.todo);
        Object.keys(todos).forEach(key => {
            _id = Math.max(key, _id);
            todos[key].id = _id;
            _todoMap[_id] = todos[key];
        })
        return _todoMap;
    }

    const store = (storage) => {
        storage.todo = JSON.stringify(_todoMap);
    }

    const getTodo = (id) => {
        return _todoMap[id];
    }

    const deleteTodo = (id) => {
        delete _todoMap[id];
    }

    const switchStatus = (id) => {
        _todoMap[id].done = !_todoMap[id].done;
        return _todoMap[id];
    }

    const getAllTodos = () => {
        return _todoMap;
    }

    return {
        createTodo,
        editTodo,
        deleteTodo,
        loadStorage,
        getTodo,
        store,
        switchStatus,
        getAllTodos
    };
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
        const categoryStorage = storage.category;
        if (categoryStorage === undefined) {
            return;
        }
        const categories = JSON.parse(storage.category);
        Object.keys(categories).forEach(key => {
            _id = Math.max(key, _id);
            categories[key].id = _id;
            _categoryMap[_id] = categories[key];
            for (const todo in _categoryMap[_id].todos) {
                todoModel.getAllTodos()[todo] = _categoryMap[_id].todos[todo];
            }
        })
        return _categoryMap;
    }

    const store = (storage) => {
        storage.category = JSON.stringify(_categoryMap);
    }

    const createCategory = (data) => {
        const newCategory = category(data.name);
        _categoryMap[_id] = newCategory;
        return newCategory;
    }

    const editCategory = (id, data) => {
        Object.keys(data).forEach(key => {
            _categoryMap[id][key] = data[key];
        });
    };

    const deleteCategory = (id) => {
        const category = _categoryMap[id];
        Object.keys(category.todos).forEach(todo => {
            todoModel.deleteTodo(todo);
            delete category.todos[todo];
        })
        delete _categoryMap[id];
    };

    const getCategory = (id) => {
        return _categoryMap[id];
    }

    const addTodo = (categoryId, todo) => {
        _categoryMap[categoryId].todos[todo.id] = todo;
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
        createCategory,
        editCategory,
        deleteCategory,
        addTodo,
        removeTodo,
        getAllTodos,
        getCategory,
        getAllCategories,
        loadStorage,
        store
    }
})();

const model = (() => {
    let _storage = null;

    const loadStorage = () => {
        if (_storage === null) {
            console.warn('No storage to load from');
            return;
        }
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

    const store = (storage = _storage) => {
        if (_storage === null) {
            console.warn('No storage to write to');
            return;
        }
        todoModel.store(storage);
        categoryModel.store(storage);
    }

    const createTodo = (data) => {
        const todo = todoModel.createTodo(data);
        categoryModel.addTodo(todo.category, todo);
        return todo;
    }

    const deleteTodo = (todoId) => {
        const todo = todoModel.getTodo(todoId);
        todoModel.deleteTodo(todoId);
        categoryModel.removeTodo(todo.category, todoId)
    }

    const getAllCategories = () => {
        return categoryModel.getAllCategories();
    }

    const getCategory = (id) => {
        return categoryModel.getCategory(id);
    }

    return {
        loadStorage,
        getStorage,
        setStorage,
        store,
        createTodo,
        deleteTodo,
        getAllCategories,
        getCategory
    }
})();

const model2 = (() => {
    const _categoryMap = {};
    const _todoMap = {};
    const _storageName = 'model2';
    let _categoryId = 0;
    let _todoId = 0;
    let _storage = null;

    const _addToMaps = (todo) => {
        _categoryMap[todo.category].todos = todo;
        _todoMap[todo.id] = todo;
    };

    const _removeFromMaps = (todo) => {
        delete _categoryMap[todo.category].todos[todo.id];
        delete _todoMap[todo.id];
    };

    const _updateStorage = () => {
        _storage.setItem(_storageName, _categoryMap);
    };

    const _readStorage = () => {
        const categories = JSON.parse(_storage.getItem(_storageName));
        Object.keys(categories).forEach(key => {
            _categoryId = Math.max(key, _categoryId);
            categories[key].id = _categoryId;
            _categoryMap[_categoryId] = categories[key];
            for (const todo in _categoryMap[_categoryId].todos) {
                _todoMap[todo] = _categoryMap[_categoryId].todos[todo]
                _todoId = Math.max(_todoId, todo);
            }
        })
    };

    const initialize = (storage) => {
        _storage = storage;
        _readStorage();
    };

    const createTodo = (data) => {
        _todoId++;
        const todo = {
            id: _todoId,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            priority: data.priority,
            done: false,
            category: data.category,
        }
        _addToMaps(todo);
        _updateStorage();
    };

    const editTodo = (id, data) => {
        const todo = getTodo(id);
        Object.keys(data).forEach(key => {
            todo[key] = data[key];
        })
        return todo;
    };

    const deleteTodo = (id) => {
        const todo = getTodo(id);
        _removeFromMaps(todo);
    };

    const getTodo = (id) => {
        return _todoMap[id];
    };

    const getAllTodos = () => {
        return _todoMap;
    };

    const createCategory = (data) => {
        _categoryId++;
        const category = {
            id: _categoryId,
            name: name,
            todos: {}
        };
        _categoryMap[_categoryId] = category;
    };

    const editCategory = (id, data) => {
        const category = getCategory(id);
        Object.keys(data).forEach((key) => {
            category[key] = data[key];
        });
    };

    const deleteCategory = (id) => {
        const category = getCategory(id);
        Object.keys(category.todos).forEach((todoId) => {
            _removeFromMaps(todoId);
        });
        delete _categoryMap[id];
    };

    const getCategory = (id) => {
        return _categoryMap[id];
    };

    const getAllCategories = () => {
        return _categoryMap;
    };

    return {
        initialize,
        createTodo,
        editTodo,
        deleteTodo,
        getTodo,
        getAllTodos,
        createCategory,
        editCategory,
        deleteCategory,
        getCategory,
        getAllCategories
    }
})();

export { model2, model, todoModel, categoryModel };
