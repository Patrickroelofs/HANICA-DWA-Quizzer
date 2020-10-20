const initialQuestionState = {
    all: '',
    selected: ''
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
        default: {
            return state
        }
    }
}

export default questionReducer
