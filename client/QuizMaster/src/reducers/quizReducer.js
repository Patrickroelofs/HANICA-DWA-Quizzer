import { ACCEPT_TEAM, REMOVE_TEAM, GET_TEAMS } from '../actions/teamActions'
import {CREATE_QUIZ, CREATE_ROUND, START_QUIZ} from '../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    roundNumber: 0,
    language: '',
    fetchTeams: false,
    startQuiz: false,
    fetchAnswers: false,
    scoreboard: false,
    connectedTeams: [],
    acceptedTeams: [],
    answers: [],
    endResults: false,
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case 'ANSWER': {
            return {
                ...state,
                fetchAnswers: true
            }
        }

        case 'RESET_STATE': {
            return {
                ...initialQuizState
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
                fetchAnswers: true
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
        case 'GET_ANSWERS':
            return {
                ...state,
                fetchAnswers: false,
                answers: action.payload
            }

        case 'QUESTION_CLOSED': 
            return {
                ...state,
                answers: []
            }
        case 'SCOREBOARD_JOINED':
            return {
                ...state,
                scoreboard: true
            }
        case 'END_RESULTS': 
            return {
                ...state,
                endResults: true
            }
        default: {
            return state
        }
    }
}

export default quizReducer
