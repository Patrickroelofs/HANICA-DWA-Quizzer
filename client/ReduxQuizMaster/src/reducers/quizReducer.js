import { CREATE_QUIZ, GET_TEAMS } from './../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    language: '',
    fetchTeams: false,
    teams: []
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case CREATE_QUIZ: {
            return {
                ...state,
                language: action.language,
                roomCode: action.roomCode,
                fetchTeams: true,
            }
        }

        case GET_TEAMS: {
            return {
                ...state,
                fetchTeams: false,
                teams: action.payload
            }
        }

        case 'TEAM_JOINED': {
            return {
                ...state,
                fetchTeams: true,
            }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
