const english = {
    'pin': "Game PIN : ",
    'teamsInRoom': "Teams in Room",
    'noTeamsFound': "No Teams found...",
    'userAccepted': "Team Accepted.",
    'scoreboardJoined': 'Scoreboard has joined the quiz.',
    'noScoreboardFound': 'No scoreboard found...',
    'categories': 'Choose Categories',
    'chosenCategories': 'Chosen Categories:',
    'startSendingQuestions': 'Start Sending Questions',
    'chooseaQuestion': 'Choose a question and send it to the teams!',
    'refreshQuestions': 'Load new questions...',
    'waitingForAnswer': 'waiting for answer',
    'closeQuestion': 'Close Question',
    'newRound': 'Start new Round?',
    'threeRoundsPlayed': '3 Rounds played',
    'rounds': 'Round',
    'endQuiz': 'End Quizzer',
    'showresults': 'Show End Results'
}

const nederlands = {
    'pin' : 'Kamer Code : ',
    'teamsInRoom': "Teams in kamer",
    'noTeamsFound': "Nog geen teams gevonden...",
    'userAccepted': "Team toegevoegd.",
    'scoreboardJoined': 'Scoreboard is in de quiz',
    'noScoreboardFound': 'Geen scoreboard gevonden...',
    'categories': 'Categorieën kiezen',
    'chosenCategories': 'Gekozen Categorieën',
    'startSendingQuestions': 'Start met vragen sturen',
    'chooseaQuestion': 'Kies een vraag en verstuur hem naar de teams!',
    'refreshQuestions': 'Nieuwe vragen laden...',
    'waitingForAnswer': 'Wachten op antwoord...',
    'closeQuestion': 'Vraag sluiten.',
    'newRound': 'Nieuwe ronde starten?',
    'threeRoundsPlayed': '3 Rondes gespeeld',
    'rounds': 'Ronde',
    'endQuiz': 'Sluit quizzer',
    'showresults': 'Laat eindresultaat zien'
}

export const translate = (language, value) => {
    if(language === 'en' || language === 'EN') {
        return english[value]

    } else if(language === 'nl' || language === 'NL') {
        return nederlands[value]

    }
}