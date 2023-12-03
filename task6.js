// Задача о сортировке объектов: у вас есть
// массив объектов вида { name: 'John', age: 25 }.
// Напишите код, который сортирует этот массив по
// возрастанию возраста, а при равных возрастах
// сортирует по алфавиту по полю name.

function sortArray(arr) {
    // Возвращаем сортированный массив
    return arr.sort((A, B) => {
        // Если есть разница в возрастах, то возвращаем ее
        if (A.age !== B.age) return A.age - B.age;
        // Иначе сравниваем имена
        if (A.name > B.name) return 1;
        if (A.name < B.name) return -1;
        return 0;
    });
}

const data = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 22 },
    { name: 'Eva', age: 28 },
    { name: 'David', age: 25 },
    { name: 'Sophia', age: 30 },
    { name: 'James', age: 22 },
    { name: 'Olivia', age: 28 },
    { name: 'Michael', age: 25 },
    { name: 'Emily', age: 30 },
    { name: 'Daniel', age: 22 },
    { name: 'Emma', age: 28 },
    { name: 'William', age: 25 },
    { name: 'Ava', age: 30 },
    { name: 'Matthew', age: 22 },
    { name: 'Sophie', age: 28 },
    { name: 'Christopher', age: 25 },
    { name: 'Grace', age: 30 },
    { name: 'Jackson', age: 22 },
    { name: 'Mia', age: 28 },
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 22 },
    { name: 'Eva', age: 28 },
    { name: 'David', age: 25 },
    { name: 'Sophia', age: 30 },
    { name: 'James', age: 22 },
    { name: 'Olivia', age: 28 },
    { name: 'Michael', age: 25 },
    { name: 'Emily', age: 30 },
    { name: 'Daniel', age: 22 },
    { name: 'Emma', age: 28 },
    { name: 'William', age: 25 },
    { name: 'Ava', age: 30 },
    { name: 'Matthew', age: 22 },
    { name: 'Sophie', age: 28 },
    { name: 'Christopher', age: 25 },
    { name: 'Grace', age: 30 },
    { name: 'Jackson', age: 22 },
    { name: 'Mia', age: 28 },
];

console.log(sortArray(data));
