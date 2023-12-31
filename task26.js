// Задача: Рекурсивный обход дерева DOM:: Напишите функцию,
// которая рекурсивно обходит дерево DOM, начиная с указанного
// элемента, и выполняет определенное действие с каждым узлом
// (например, выводить информацию о теге в консоль).

// Функция принимает DOM элемент и коллбэк, который применяет к элементу и к его дочерним элементам.
function iterateAllDOMElements(rootElement, callback) {
    callback(rootElement);
    for (let Element of rootElement.children) {
        iterateAllDOMElements(Element, callback);
    }
}
