import { ACCEPT_TEAM, REMOVE_TEAM, GET_TEAMS } from '../actions/teamActions'
import { CREATE_QUIZ, START_QUIZ } from './../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    language: '',
    fetchTeams: false,
    startQuiz: false,
    connectedTeams: [],
    acceptedTeams: []
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
                connectedTeams: action.payload
            }
        }

        case 'TEAM_JOINED': {
            return {
                ...state,
                fetchTeams: true,
            }
        }

        case ACCEPT_TEAM: {
            return {
                ...state,
                acceptedTeams: action.payload
            }
        }

        case REMOVE_TEAM: {
            return {
                ...state,
                fetchTeams: true
            }
        }

        case START_QUIZ: {
            return {
                ...state,
                startQuiz: true,
            }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
