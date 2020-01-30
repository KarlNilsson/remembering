const todoView = (() => {
    const _trIndex = {
        TITLE: 0,
        DUEDATE: 1,
        DONE: 2
    }

    const generateTodoElements = (todo) => {
        const row = document.createElement('tr');
        row.classList.add('todo-row');
        row.id = `todo-${todo['id']}`;
        const titleTD = document.createElement('td');
        const dueDateTD = document.createElement('td');
        const doneTD = document.createElement('td');

        titleTD.innerHTML = todo['title'] !== undefined ? todo['title'] : '';
        dueDateTD.innerHTML = todo['dueDate'] !== undefined ? todo['dueDate'] : '';
        doneTD.innerHTML = todo['done'] !== undefined ? todo['done'] : '';
        if (todo['done']) {
            row.classList.add('done');
        }
        if (todo['priority']) {
            row.classList.add('prioritized');
        }
        
        row.appendChild(titleTD);
        row.appendChild(dueDateTD);
        row.appendChild(doneTD);
        
        return row;

    }

    const editTodoElement = (todo) => {
        const childNodes = document.querySelector(`#todo-${todo['id']}`).childNodes;
        const titleTD = childNodes[_trIndex.TITLE];
        const dueDateTD = childNodes[_trIndex.DUEDATE];
        const doneTD = childNodes[_trIndex.DONE];

        titleTD.innerHTML = todo['title'] !== undefined ? todo['title'] : '';
        dueDateTD.innerHTML = todo['dueDate'] !== undefined ? todo['dueDate'] : '';
        doneTD.innerHTML = todo['done'] !== undefined ? todo['done'] : '';
        if (todo['done']) {
            row.classList.add('done');
        }
        if (todo['priority']) {
            row.classList.add('prioritized');
        }

    }

    const generateTableHeader = () => {
        const trHeaders = document.createElement('tr');

        const trTitle = document.createElement('th');
        const trDueDate = document.createElement('th');
        const trDone = document.createElement('th');
        trTitle.innerHTML = 'Title';
        trDueDate.innerHTML = 'Due date';
        trDone.innerHTML = 'Done';
        trHeaders.appendChild(trTitle);
        trHeaders.appendChild(trDueDate);
        trHeaders.appendChild(trDone);

        return trHeaders;
    }

    return { generateTodoElements, generateTableHeader, editTodoElement }
})();

export { todoView };