const english = {
    'pin': "Game PIN : ",
    'teamsjoined': "These teams have joined.",
    'hasAnswered': 'Has answered.',
    'answers': 'Answers',
    'rightAnswers': 'Right Answer',
    'endResult': 'Winner!',
    'questionumber': 'Question',
    'roundnumber': 'Round'
}

const nederlands = {
    'pin': "Kamercode : ",
    'teamsjoined': "Deze teams zitten in de quiz.",
    'hasAnswered': 'Heeft geantwoord.',
    'answers': 'Antwoorden',
    'rightAnswers': 'Goede Antwoord',
    'endResult': 'Winnaar!',
    'questionumber': 'Vraag',
    'roundnumber': 'Ronde'
}

export const translate = (language, value) => {
    if(language === 'en' || language === 'EN') {
        return english[value]

    } else if(language === 'nl' || language === 'NL') {
        return nederlands[value]

    }
}