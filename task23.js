// Анализатор сложности пароля: создайте функцию, которая оценивает
// сложность введенного пользователем пароля. Необходимо анализировать
// длину пароля, использование различных символов, наличие чисел и
// букв в разных регистрах. Выведите пользователю оценку сложности
// пароля и предложите улучшения, если пароль слишком слабый.

// Граничные значения для оценки сложности пароля
const passwordParams = {
    passLength: [8, 12, 16],
    upperCaseCount: [1, 2, 3],
    lowerCaseCount: [1, 2, 3],
    numbersCount: [1, 2, 3],
    symbolsCount: [1, 2, 3],
};

// Строки для вывода в результаты
const invalidPasswordLoacalization = {
    passLength: 'длинну пароля',
    lowerCaseCount: 'количество строчных букв',
    upperCaseCount: 'количество заглавных букв',
    numbersCount: 'количество цифр',
    symbolsCount: 'количество символов',
};

// Проверка валидности пароля
function isPasswordValid(passwordResults) {
    return passwordResults.every((Param) => Param.paramRaiting !== 0);
}

// Строки для локализации результата
const validPasswordRaitingLocalization = [
    'ненадежный',
    'слабый',
    'средний',
    'сильный',
];

// Функция для получения описания пароля
function getPasswordDescription(passwordResults) {
    // Проверяем валидность пароля
    const isValid = isPasswordValid(passwordResults);
    if (!isValid) {
        // Если пароль невалиден, выводим сообщение о невалидности пароля, и пишем что стоит улучшить
        let resultString = `Пароль ненадежный. Увеличьте`;
        const invalidParamsStrings = passwordResults.reduce(
            (StringArray, Param) => {
                if (Param.paramRaiting === 0)
                    return [
                        ...StringArray,
                        invalidPasswordLoacalization[Param.paramName],
                    ];
                return StringArray;
            },
            []
        );
        return `${resultString} ${invalidParamsStrings.join(', ')}.`;
    } else {
        const passwordRaiting = Math.min(
            ...passwordResults.map((Param) => Param.paramRaiting)
        );
        const passwordRaitingString =
            validPasswordRaitingLocalization[passwordRaiting];
        const minParamsStrings = passwordResults.reduce(
            (StringArray, Param) => {
                if (Param.paramRaiting === passwordRaiting)
                    return [
                        ...StringArray,
                        invalidPasswordLoacalization[Param.paramName],
                    ];
                return StringArray;
            },
            []
        );
        return passwordRaiting === 3
            ? `Пароль ${passwordRaitingString}.`
            : `Пароль ${passwordRaitingString}. Для улучшения увеличьте ${minParamsStrings.join(
                  ', '
              )}.`;
    }
}

// Функция высчитывающая рейтинг пароля по определенному параметру
function calcRaiting(currentResult, resultsArray) {
    // currentResult - рейтинг пароля по параметру
    // resultsArray - массив с граничными значениями рейтинга для оценки
    let result = resultsArray.length;
    resultsArray.forEach((Element) => {
        if (currentResult < Element) result--;
    });
    return result;
}

// Функция высшего порядка
// Внешняя функция принимает параметры оценки пароля
// Внутренняя принимает пароль
function getPasswodAnalysFunc(params) {
    return (password) => {
        let summaryRaiting = [];
        const passwordResults = {
            passLength: password.length,
            lowerCaseCount:
                password.match(/[a-zа-я]/g) === null
                    ? 0
                    : password.match(/[a-zа-я]/g).length,
            upperCaseCount:
                password.match(/[A-ZА-Я]/g) === null
                    ? 0
                    : password.match(/[A-ZА-Я]/g).length,
            numbersCount:
                password.match(/[0-9]/g) === null
                    ? 0
                    : password.match(/[0-9]/g).length,
            symbolsCount:
                password.match(/[^a-zA-Zа-яА-Я0-9]/g) === null
                    ? 0
                    : password.match(/[^a-zA-Zа-яА-Я0-9]/g).length,
        };
        for (let param in params) {
            summaryRaiting.push({
                paramName: param,
                paramRaiting: calcRaiting(
                    passwordResults[param],
                    params[param]
                ),
            });
        }
        return getPasswordDescription(summaryRaiting);
    };
}

console.log(
    getPasswodAnalysFunc(passwordParams)('29marAA@@$xxfAAA@@$@6tv0qff')
);
