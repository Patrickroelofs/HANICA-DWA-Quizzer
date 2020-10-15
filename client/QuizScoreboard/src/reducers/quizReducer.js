import { JOIN_QUIZ_SUCCESS } from '../actions/quizActions'

const initialQuizState = {
    scoreboardJoinSuccess: false
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, scoreboardJoinSuccess: true }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
