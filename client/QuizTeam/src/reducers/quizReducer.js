import { GET_TEAMS, JOIN_QUIZ_SUCCESS } from '../actions/quizActions'
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
        case 'NEW_QUESTION': {
            return {...state, currentQuestion: action.payload}
        }
        case 'SEND_ANSWER': {
            return {...state, answered : true}
        }
        default: {
            return state
        }
    }
}

export default quizReducer
