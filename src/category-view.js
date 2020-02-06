const categoryView = (() => {
    const createCategoryList = (contentGrid) => {
        const categoryListContainer = document.createElement('div');
        categoryListContainer.classList.add(
            'remem-list-container', 'category-container'
        );

        const listHeader = document.createElement('div');
        listHeader.classList.add('remem-list-header');
        categoryListContainer.appendChild(listHeader);

        const newButtonContainer = document.createElement('div');
        newButtonContainer.classList.add(
            'remem-new-container', 'remem-icon-td'
        );
        listHeader.appendChild(newButtonContainer);
        const newButton = document.createElement('div');
        newButton.classList.add('icono-plus');
        newButtonContainer.appendChild(newButton);

        const categoryHeader = document.createElement('h3');
        categoryHeader.classList.add('general-text');
        categoryHeader.innerHTML = 'Categories';
        listHeader.appendChild(categoryHeader);

        const categoryList = document.createElement('ul');
        categoryList.classList.add(
            'remem-list', 'category-list', 'general-text'
        );
        categoryListContainer.appendChild(categoryList);
        return categoryListContainer;
    };

    const addCategory = (category) => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add(
            'remem-list-item', 'category-item', 'general-text'
        );
        categoryItem.id = `category-${category.id}`;
        categoryItem.innerHTML = category.name;
        return categoryItem;
    };

    const editCategoryElement = (category) => {
        const categoryElement = document.querySelector(
            `li.remem-list-item#category-${category.id}`
        );
        categoryElement.innerText = category.name;
    };

    const deleteCategoryElement = (id) => {
        const categoryElement = document.querySelector(
            `li.remem-list-item#category-${id}`
        );
        document.querySelector('ul.remem-list').removeChild(categoryElement);
    };

    return {
        createCategoryList,
        addCategory,
        editCategoryElement,
        deleteCategoryElement
    };
})();

export { categoryView };
