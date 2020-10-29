

const initialQuestionState = {
    all: '',
    randomized: '',
    questionNumber: 0,
}

const questionReducer = (state = initialQuestionState, action) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return {
                ...initialQuestionState
            }
        }
        case 'SELECT_QUESTIONS':
            return {
                ...state,
                currentCategory : action.payload
            }
        case 'GET_QUESTIONS' :
            return {
                ...state,
                all : action.payload
            }

        case 'RANDOM_QUESTIONS': 
            return {
                ...state,
                randomized: action.payload
            }
        case 'SEND_QUESTION':
            return {
                ...state,
                currentQuestions : action.payload,
                questionNumber: state.questionNumber + 1,
            }

        case 'NEW_ROUND': 
            return {
                ...state,
                questionNumber: 0
            }
        default: {
            return state
        }
    }
}

export default questionReducer
