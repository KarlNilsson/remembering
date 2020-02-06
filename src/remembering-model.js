const model = (() => {
    const _categoryMap = {};
    const _todoMap = {};
    const _storageName = 'model';
    let _categoryId = 0;
    let _todoId = 0;
    let _storage = null;

    const _addToMaps = (todo) => {
        _categoryMap[todo.category].todos[todo.id] = todo;
        _todoMap[todo.id] = todo;
    };

    const _removeFromMaps = (todo) => {
        delete _categoryMap[todo.category].todos[todo.id];
        delete _todoMap[todo.id];
    };

    const _updateStorage = () => {
        _storage.setItem(_storageName, JSON.stringify(_categoryMap));
    };

    const _readStorage = () => {
        const categories = JSON.parse(_storage.getItem(_storageName));
        if (categories !== null) {
            Object.keys(categories).forEach(key => {
                _categoryId = Math.max(key, _categoryId);
                categories[key].id = _categoryId;
                _categoryMap[_categoryId] = categories[key];
                for (const todo in _categoryMap[_categoryId].todos) {
                    _todoMap[todo] = _categoryMap[_categoryId].todos[todo];
                    _todoId = Math.max(_todoId, todo);
                }
            });
        }
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
        };
        _addToMaps(todo);
        _updateStorage();
        return todo;
    };

    const editTodo = (id, data) => {
        const todo = getTodo(id);
        Object.keys(data).forEach(key => {
            todo[key] = data[key];
        });
        _updateStorage();
        return todo;
    };

    const deleteTodo = (id) => {
        const todo = getTodo(id);
        _removeFromMaps(todo);
        _updateStorage();
    };

    const getTodo = (id) => {
        return _todoMap[id];
    };

    const getAllTodosForCategory = (id) => {
        return getCategory(id).todos;
    };

    const createCategory = (data) => {
        _categoryId++;
        const category = {
            id: _categoryId,
            name: data.name,
            todos: {}
        };
        _categoryMap[_categoryId] = category;
        _updateStorage();
        return category;
    };

    const editCategory = (id, data) => {
        const category = getCategory(id);
        Object.keys(data).forEach((key) => {
            category[key] = data[key];
        });
        _updateStorage();
        return category;
    };

    const deleteCategory = (id) => {
        const category = getCategory(id);
        Object.keys(category.todos).forEach((todoId) => {
            _removeFromMaps(getTodo(todoId));
        });
        delete _categoryMap[id];
        _updateStorage();
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
        getAllTodosForCategory,
        createCategory,
        editCategory,
        deleteCategory,
        getCategory,
        getAllCategories
    };
})();

export { model };
