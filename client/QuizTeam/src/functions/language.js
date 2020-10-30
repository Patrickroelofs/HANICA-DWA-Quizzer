const english = {
    'pin': "Game PIN : ",
    'roomStarted': 'sorry this room has already started, or the team already exists.',
    'loginWithTeam': 'Join with Team',
    'waitingForReview': 'Waiting for review from Quiz master of room.',
    'rejected': 'You have been rejected to join the quiz.',
    'waitingToStart': 'Waiting for QuizMaster to start choosing questions.',
    'round': 'Round',
    'making': 'In the making.',
    'sendAnswer': 'Send Answer',
    'sendAnswerPlaceholder': 'Write an answer...',
    'answered': 'You have answered!',
    'answerchanges': 'Change answer'
}

const nederlands = {
    'pin' : 'Kamer Code : ',
    'roomStarted': 'Sorry deze kamer is al bezig met de quiz, of de teamnaam bestaat al.',
    'waitingForReview': 'Wachten op review van quizmaster.',
    'loginWithTeam': 'Inloggen met teamnaam',
    'rejected': 'Je bent afgewezen door de quizmaster.',
    'waitingToStart': 'Wachten op quizmaster om vragen te kiezen.',
    'round': 'Ronde',
    'making': 'In de maak.',
    'sendAnswer': 'Stuur Antwoord',
    'sendAnswerPlaceholder': 'Verzin een antwoord...',
    'answered': 'Je hebt geantwoord!',
    'answerchanges': 'Antwoord aanpassen'
}

export const translate = (language, value) => {
    if(language === 'en' || language === 'EN') {
        return english[value]

    } else if(language === 'nl' || language === 'NL') {
        return nederlands[value]

    }
}

//Waiting for review from Quiz master of room
//Sorry rejected