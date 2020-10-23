import {GET_QUESTIONS, GET_TEAMS, JOIN_QUIZ_SUCCESS} from '../actions/quizActions'
import {TEAM_ACCEPTED, TEAM_REFUSED} from "../actions/sessionActions";


const initialQuizState = {
    roomCode: '',
    accepted: undefined,
    currentQuestion: '',
    answered: undefined,
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
            return {...state, fetchQuestions : true}
        }
        case 'SEND_ANSWER': {
            return {...state, answered : true}
        }
        case 'START_QUIZ': {
            return {...state, roundNumber : action.payload}
        }
        default: {
            return state
        }
    }
}

export default quizReducer
