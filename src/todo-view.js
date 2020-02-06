const todoView = (() => {
    const _trIndex = {
        DONE: 0,
        TITLE: 1,
        DUEDATE: 2,
        STATUS: 3
    };

    const createTodoTable = () => {
        const todoTableContainer = document.createElement('div');
        todoTableContainer.classList.add(
            'remem-list-container', 'todo-container', 'general-text'
        );
        const todoTable = document.createElement('table');
        todoTableContainer.appendChild(todoTable);

        const header = todoView.generateTableHeader();
        todoTable.appendChild(header);
        return todoTableContainer;
    };

    const generateTodoElements = (todo) => {
        const row = document.createElement('tr');
        row.classList.add('todo-row');
        row.id = `todo-${todo.id}`;
        const doneTD = document.createElement('td');
        doneTD.classList.add('remem-icon-td');
        doneTD.title = 'Mark as done/undone';
        const titleTD = document.createElement('td');
        const dueDateTD = document.createElement('td');
        const statusTD = document.createElement('td');
        statusTD.classList.add('remem-icon-td');
        const binContainer = document.createElement('div');
        binContainer.title = 'Remove';
        const bin = document.createElement('div');
        const doneContainer = document.createElement('div');
        const done = document.createElement('div');
        bin.classList.add('icono-trash', 'remem-icon', 'remem-bin');
        binContainer.classList.add('remem-bin', 'remem-bin-container');
        binContainer.appendChild(bin);
        statusTD.appendChild(binContainer);

        done.classList.add('remem-icon', 'remem-done');
        doneContainer.classList.add('remem-done', 'remem-done-container');
        doneContainer.appendChild(done);
        doneTD.appendChild(doneContainer);

        titleTD.innerHTML = todo.title !== undefined ? todo.title : '';
        dueDateTD.innerHTML = todo.dueDate !== undefined ? todo.dueDate : '';
        if (todo.done) {
            row.classList.add('done');
            done.classList.add('icono-check');
        }
        if (todo.priority) {
            row.classList.add('prioritized');
        }

        row.appendChild(doneTD);
        row.appendChild(titleTD);
        row.appendChild(dueDateTD);
        row.appendChild(statusTD);

        return row;
    };

    const updateTodoElement = (todo) => {
        const row = document.querySelector(`#todo-${todo.id}`);
        const childNodes = row.childNodes;
        const titleTD = childNodes[_trIndex.TITLE];
        const dueDateTD = childNodes[_trIndex.DUEDATE];

        titleTD.innerHTML = todo.title !== undefined ? todo.title : '';
        dueDateTD.innerHTML = todo.dueDate !== undefined ? todo.dueDate : '';
        const doneIcon = childNodes[_trIndex.DONE].querySelector('.remem-icon');
        if (todo.done) {
            row.classList.add('done');
            doneIcon.classList.add('icono-check');
        } else {
            row.classList.remove('done');
            doneIcon.classList.remove('icono-check');
        }
        if (todo.priority) {
            row.classList.add('prioritized');
        } else {
            row.classList.remove('prioritized');
        }
    };

    const generateTableHeader = () => {
        const trHeaders = document.createElement('tr');

        const trDone = document.createElement('th');
        trDone.classList.add('remem-done');
        const trTitle = document.createElement('th');
        trTitle.classList.add('remem-title');
        const trDueDate = document.createElement('th');
        trDueDate.classList.add('remem-due-date');
        const trStatus = document.createElement('th');

        const newContainer = document.createElement('div');
        trDone.appendChild(newContainer);
        newContainer.classList.add('remem-new-container', 'remem-icon-td');
        const newButton = document.createElement('div');
        newButton.title = 'Create new todo';
        newContainer.appendChild(newButton);
        newButton.classList.add('icono-plus');

        trTitle.innerHTML = 'Title';
        trDueDate.innerHTML = 'Due date';
        trHeaders.appendChild(trDone);
        trHeaders.appendChild(trTitle);
        trHeaders.appendChild(trDueDate);
        trHeaders.appendChild(trStatus);

        return trHeaders;
    };

    return {
        createTodoTable,
        generateTodoElements,
        generateTableHeader,
        updateTodoElement
    };
})();

export { todoView };
