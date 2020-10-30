import {GET_QUESTIONS, GET_TEAMS, JOIN_QUIZ_SUCCESS} from '../actions/quizActions'
import {TEAM_ACCEPTED, TEAM_REFUSED} from "../actions/sessionActions";


const initialQuizState = {
    roomCode: '',
    accepted: undefined,
    currentQuestion: '',
    answered: undefined,
    questionNumber: 0,
    closeQuestion: false,
    language: 'nl'
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, roomCode: action.payload, language: action.language}
        }
        case 'JOIN_QUIZ_FAILED':{
            return {...state, accepted: false}
        }
        case GET_TEAMS: {
            return { ...state, teams: action.payload }
        }
        case TEAM_ACCEPTED: {
            return {...state, accepted: true}
        }
        case TEAM_REFUSED: {
            return {...state, accepted: false}
        }
        case GET_QUESTIONS: {
            return {...state, question : action.payload, fetchQuestions: false}
        }
        case 'NEW_QUESTION': {
            return {...state, fetchQuestions : true, questionNumber: state.questionNumber + 1}
        }
        case 'SEND_ANSWER': {
            return {...state, answered : true, answer: action.payload}
        }
        case 'START_QUIZ': {
            return {...state, roundNumber : action.payload, questionNumber: 0}
        }
        case 'CLOSE_QUESTION': {
            return {...state, closeQuestion: false}
        }
        case 'QUESTION_CLOSED': {
            return {...state, closeQuestion: true}
        }
        case 'DISCONNECTED_MASTER_LEFT': {
            return {...initialQuizState, refresh: true}
        }
        case 'QUIZ_ENDED':{
            return {...initialQuizState}
        }

        default: {
            return state
        }
    }
}

export default quizReducer
