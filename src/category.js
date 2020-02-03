const createCategory = (name) => {
    const item1 = document.createElement('li');
    item1.classList.add('remem-list-item', 'category-item', 'active');
    item1.id = 'category-1';
    item1.innerHTML = name;
    return item1;
}

export { createCategory };