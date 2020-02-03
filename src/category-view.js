const categoryView = (() => {

    const createCategoryList = (contentGrid) => {
        const categoryListContainer = document.createElement('div');
        categoryListContainer.classList.add(
            'remem-list-container', 'category-container'
            );
        const newButtonContainer = document.createElement('div');
        newButtonContainer.classList.add('remem-new-container');
        categoryListContainer.appendChild(newButtonContainer);
        const newButton = document.createElement('div');
        newButton.classList.add('icono-plus');
        newButtonContainer.appendChild(newButton);

        const categoryList = document.createElement('ul');
        categoryList.classList.add('remem-list', 'category-list', 'general-text');
        categoryListContainer.appendChild(categoryList);
        return categoryListContainer;
    }

    const addCategory = (category) => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('remem-list-item', 'category-item', 'active');
        categoryItem.id = `category-${category.id}`;
        categoryItem.innerHTML = category.name;
        return categoryItem;
    };

    const editCategoryElement = (category) => {
        const categoryElement = document.querySelector(
            `li.remem-list-item#category-${category.id}`
        );
        categoryElement.innerText = category.name;
    }

    return { createCategoryList, addCategory, editCategoryElement };
})();

export { categoryView }