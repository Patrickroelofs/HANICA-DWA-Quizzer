import { ACCEPT_TEAM, REMOVE_TEAM, GET_TEAMS } from '../actions/teamActions'
import {CREATE_QUIZ, CREATE_ROUND, START_QUIZ} from '../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    roundNumber: 0,
    language: '',
    fetchTeams: false,
    startQuiz: false,
    connectedTeams: [],
    acceptedTeams: []
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case 'ANSWER': {
            return {
                ...state,
                fetchTeams: true
            }
        }
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
                acceptedTeams: [...state.acceptedTeams, action.payload]
            }
        }
        case 'SEND_REVIEW': {
            return {
                ...state,
                fetchTeams: true
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
        case CREATE_ROUND: {
            return {
                ...state,
                roundNumber: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default quizReducer
