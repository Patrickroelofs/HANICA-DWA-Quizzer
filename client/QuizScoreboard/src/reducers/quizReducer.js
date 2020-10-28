import { GET_TEAMS, JOIN_QUIZ_SUCCESS } from '../actions/quizActions'

const initialQuizState = {
    questionNumber: 0,
    fetchTeams: false,
    fetchAnswers: false,
    quizStarted: false,
    fetchQuestions: false,
    closeQuestion: false,
    roomCode: '',
    currentQuestion: '',
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, roomCode: action.payload }
        }

        case GET_TEAMS: {
            return { ...state, teams: action.payload, fetchTeams: false }
        }

        case 'TEAM_JOINED': {
            return { ...state, fetchTeams: true }
        }
        case 'TEAM_REFUSED': {
            return { ...state, fetchTeams: true }
        }
        case 'START_QUIZ': {
            return { ...state, roundNumber: action.payload}
        }
        case 'NEW_QUESTION': {
            return {...state, fetchQuestions: true, questionNumber: state.questionNumber + 1}
        }
        case 'GET_QUESTIONS': {
            return {...state, fetchQuestions: true, currentQuestion: action.payload}
        }
        case 'CLOSE_QUESTION': {
            return {...state, closeQuestion: false}
        }
        case 'QUESTION_CLOSED': {
            return {...state, closeQuestion: true}
        }
        case 'ANSWER': {
            return {...state, fetchAnswers: true}
        }
        case 'ANSWER_REVIEWED': {
            return {...state, fetchAnswers: true}
        }
        case 'GET_ANSWERS': {
            return {...state, answers: action.payload, fetchAnswers: false}
        }

        default: {
            return state
        }
    }
}

export default quizReducer
