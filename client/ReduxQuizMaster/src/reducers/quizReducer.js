import { CREATE_QUIZ } from './../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    language: '',
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case CREATE_QUIZ: {
            return {
                ...state,
                language: action.language,
                roomCode: action.roomCode,
            }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
