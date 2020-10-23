

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
        case 'SEND_QUESTION':
            return {
                ...state,
                currentQuestions : action.payload
            }
        case 'ANSWER':
            // idk how were gonna do this (needs to save the team that sent the answer but also the answer)...or
            // maybe we will just get it from the database since were supposed to safe the answer in the team.. so yeah
            // still need to do that. once thats done probably only need to send the team name and tell it to get the stuff from database
            // just idk how to :D
            return {
                ...state,
                answer : action.payload
            }
        default: {
            return state
        }
    }
}

export default questionReducer
