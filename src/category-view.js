const categoryView = (() => {

    const createCategoryList = (contentGrid) => {
        const categoryListContainer = document.createElement('div');
        categoryListContainer.classList.add(
            'remem-list-container', 'category-container'
            );
        const categoryList = document.createElement('ul');
        categoryList.classList.add('remem-list', 'category-list', 'general-text');
        categoryListContainer.appendChild(categoryList);
        const categoryItem1 = createCategory({name: 'I\'m a category'});
        categoryList.appendChild(categoryItem1);
        return categoryListContainer;
    }

    const createCategory = (category) => {
        const item1 = document.createElement('li');
        item1.classList.add('remem-list-item', 'category-item', 'active');
        item1.id = 'category-1';
        item1.innerHTML = category.name;
        return item1;
    };

    const editCategoryElement = (category) => {
        const categoryElement = document.querySelector(
            `li.remem-list-item#category-${category.id}`
        );
        categoryElement.innerText = category.name;
    }

    return { createCategoryList, createCategory, editCategoryElement };
})();

export { categoryView }