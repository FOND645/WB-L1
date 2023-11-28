// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания 
// выполнения других асинхронных операций, и возвращает 
// результат выполнения.

async function PromiseAll(promisesArray) {
    let result = []
    for (let Xpromise of promisesArray) {
        result.push(await Xpromise)
    }
    return result
}

// Примерный аналог
async function XPromiseAll(promisesArray) {
    return await Promise.all(promisesArray)
}