// Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов,
// на выходе объект, представляющий из себя односвязный список.

function convertToLinkedList(JSONstring) {
    // Парсим данные из JSON'a
    let array = JSON.parse(JSONstring);

    // Проходимся по всем элементам массив
    for (let i = array.length - 1; i >= 0; i--) {
        // Если это последний элемент в массиве, то преобразуем его в узел без ссылки на следующий узел
        if (i === array.length - 1) {
            array[i] = {
                element: array[i],
            };
        } else {
            // А если нет, то преобразуем его в узел и оставляем next - ссылку на следующий узел
            array[i] = {
                element: array[i],
                next: array[i + 1],
            };
        }
    }

    return array[0];
}

const inputJSON = `[
    {"id": 1, "name": "John", "lastName": "Doe"},
    {"id": 2, "name": "Alice", "lastName": "Smith"},
    {"id": 3, "name": "Bob", "lastName": "Johnson"},
    {"id": 4, "name": "Eva", "lastName": "Brown"},
    {"id": 5, "name": "David", "lastName": "Miller"},
    {"id": 6, "name": "Sophia", "lastName": "Davis"},
    {"id": 7, "name": "James", "lastName": "Wilson"},
    {"id": 8, "name": "Olivia", "lastName": "Moore"},
    {"id": 9, "name": "Michael", "lastName": "Taylor"},
    {"id": 10, "name": "Emily", "lastName": "Anderson"},
    {"id": 11, "name": "Daniel", "lastName": "Thomas"},
    {"id": 12, "name": "Emma", "lastName": "White"},
    {"id": 13, "name": "William", "lastName": "Jones"},
    {"id": 14, "name": "Ava", "lastName": "Clark"},
    {"id": 15, "name": "Matthew", "lastName": "Hall"},
    {"id": 16, "name": "Sophie", "lastName": "Lewis"},
    {"id": 17, "name": "Christopher", "lastName": "Baker"},
    {"id": 18, "name": "Grace", "lastName": "Hill"},
    {"id": 19, "name": "Jackson", "lastName": "Cooper"},
    {"id": 20, "name": "Mia", "lastName": "Rogers"}
]`;

console.log(convertToLinkedList(inputJSON));
