const initialQuestionState = {
    all: '',
    randomized: ''
}

const questionReducer = (state = initialQuestionState, action) => {
    switch (action.type) {
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
        default: {
            return state
        }
    }
}

export default questionReducer
