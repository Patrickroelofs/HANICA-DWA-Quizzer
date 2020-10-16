import { GET_TEAMS, JOIN_QUIZ_SUCCESS } from '../actions/quizActions'

const initialQuizState = {
    roomCode: '',
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, roomCode: action.payload }
        }

        case GET_TEAMS: {
            return { ...state, teams: action.payload }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
