const modalView = (() => {
    const createInput = (name, content = '', type = 'text') => {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');
        inputDiv.id = name;

        const inputElement = document.createElement('input');
        inputElement.classList.add('remem-input', 'general-text');
        inputElement.type = type;
        inputElement.id = name.replace(' ', '');
        if (content !== '') {
            inputElement.value = content;
        } else if (type === 'date') {
            const date = new Date();
            inputElement.value = date.getFullYear().toString() +
            '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);
        }

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', name);
        labelElement.innerHTML = name;

        inputDiv.appendChild(labelElement);
        inputDiv.appendChild(inputElement);
        return inputDiv;
    }

    const createCheckbox = (name, content = false) => {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('remem-input-div');
        inputDiv.id = name;

        const inputContainer = document.createElement('label');
        inputContainer.classList.add('remem-checkbox-container');

        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';

        const customSpan = document.createElement('span');
        customSpan.classList.add('remem-checkbox');
        if (content) {
            customSpan.classList.add('checked');
        }
        customSpan.addEventListener('click', e => {
            e.target.classList.toggle('checked');
        });

        inputContainer.appendChild(inputElement);
        inputContainer.appendChild(customSpan);
        inputDiv.innerText = name;
        inputDiv.appendChild(inputContainer);

        return inputDiv;
    }

    const createSubmitButton = () => {
        const submitButton = document.createElement('button');
        submitButton.classList.add(
            'remem-button', 'remem-input', 'general-text', 'submit-button'
        );
        submitButton.innerHTML = 'Submit';
        return submitButton;
    }

    const createCancelButton = () => {
        const cancelButton = document.createElement('button');
        cancelButton.classList.add(
            'remem-button', 'remem-input', 'general-text', 'cancel-button'
        );
        cancelButton.innerHTML = 'Cancel';
        return cancelButton;
    }

    const createDeleteButton = () => {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add(
            'remem-button', 'remem-input', 'general-text', 'delete-button'
        );
        deleteButton.innerHTML = 'Delete';
        return deleteButton;
    }

    return {
        createInput,
        createCheckbox,
        createSubmitButton,
        createCancelButton,
        createDeleteButton
    }
})();

export { modalView }
