import {GET_QUESTIONS, GET_TEAMS, JOIN_QUIZ_SUCCESS} from '../actions/quizActions'
import {TEAM_ACCEPTED, TEAM_REFUSED} from "../actions/sessionActions";


const initialQuizState = {
    roomCode: '',
    accepted: undefined,
    currentQuestion: '',
    answered: undefined,
    questionNumber: 0,
    closeQuestion: false,
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, roomCode: action.payload, }
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
            return {...state, roundNumber : action.payload}
        }
        case 'CLOSE_QUESTION': {
            return {...state, closeQuestion: false}
        }
        case 'QUESTION_CLOSED': {
            return {...state, closeQuestion: true}
        }
        default: {
            return state
        }
    }
}

export default quizReducer
