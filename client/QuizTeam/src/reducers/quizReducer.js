import { GET_TEAMS, JOIN_QUIZ_SUCCESS } from '../actions/quizActions'
import {TEAM_ACCEPTED, TEAM_REFUSED} from "../actions/sessionActions";


const initialQuizState = {
    roomCode: '',
    accepted: undefined,
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
        default: {
            return state
        }
    }
}

export default quizReducer
