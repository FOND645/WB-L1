// Анализатор сложности пароля: создайте функцию, которая оценивает 
// сложность введенного пользователем пароля. Необходимо анализировать 
// длину пароля, использование различных символов, наличие чисел и 
// букв в разных регистрах. Выведите пользователю оценку сложности 
// пароля и предложите улучшения, если пароль слишком слабый.

const passwordParams = {
    passLength: [8, 12, 16],
    upperCaseCount: [1, 2, 3],
    lowerCaseCount: [1, 2, 3],
    numbersCount: [1, 2, 3],
    symbolsCount: [1, 2, 3],
}

const invalidPasswordLoacalization = {
    passLength: 'длинну пароля',
    lowerCaseCount: "количество строчных букв",
    upperCaseCount: "количество заглавных букв",
    numbersCount: "количество цифр",
    symbolsCount: "количество символов",
}

function isPasswordValid(passwordResults) {
    return passwordResults.every(Param => Param.paramRaiting !== 0)
}

const validPasswordRaitingLocalization = ["ненадежный", 'слабый', "средний", "сильный"]

function getPasswordDescription(passwordResults) {
    const isValid = isPasswordValid(passwordResults)
    if (!isValid) {
        let resultString = `Пароль ненадежный. Увеличьте`
        const invalidParamsStrings = passwordResults.reduce((StringArray, Param) => {
            if (Param.paramRaiting === 0) return [...StringArray, invalidPasswordLoacalization[Param.paramName]]
            return StringArray
        }, [])
        return `${resultString} ${invalidParamsStrings.join(', ')}.`
    } else {
        const passwordRaiting = Math.min(...passwordResults.map(Param => Param.paramRaiting))
        const passwordRaitingString = validPasswordRaitingLocalization[passwordRaiting]
        const minParamsStrings = passwordResults.reduce((StringArray, Param) => {
            if (Param.paramRaiting === passwordRaiting) return [...StringArray, invalidPasswordLoacalization[Param.paramName]]
            return StringArray
        }, [])
        return passwordRaiting === 3 ? `Пароль ${passwordRaitingString}.` : `Пароль ${passwordRaitingString}. Для улучшения увеличьте ${minParamsStrings.join(', ')}.`
    }
}

function calcRaiting(currentResult, resultsArray) {
    let result = resultsArray.length
    resultsArray.forEach((Element) => {
        if (currentResult < Element) result--
    });
    return result
}

function getPasswodAnalysFunc(params) {
    return (password) => {
        let summaryRaiting = []
        const passwordResults = {
            passLength: password.length,
            lowerCaseCount: password.match(/[a-zа-я]/g) === null ? 0 : password.match(/[a-zа-я]/g).length,
            upperCaseCount: password.match(/[A-ZА-Я]/g) === null ? 0 : password.match(/[A-ZА-Я]/g).length,
            numbersCount: password.match(/[0-9]/g) === null ? 0 : password.match(/[0-9]/g).length,
            symbolsCount: password.match(/[^a-zA-Zа-яА-Я0-9]/g) === null ? 0 : password.match(/[^a-zA-Zа-яА-Я0-9]/g).length,
        }
        for (let param in params) {
            summaryRaiting.push({
                paramName: param,
                paramRaiting: calcRaiting(passwordResults[param], params[param])
            })
        }
        return getPasswordDescription(summaryRaiting)
    }
}

// getPasswodAnalysFunc(passwordParams)('AAAAAAAAA')
console.log(getPasswodAnalysFunc(passwordParams)('29marAA@@$xxfAAA@@$@6tv0qff'))