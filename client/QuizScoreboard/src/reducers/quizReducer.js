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
    accepted : undefined,
    message: ''
}

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case JOIN_QUIZ_SUCCESS: {
            return { ...state, roomCode: action.payload, accepted: true, language: action.language }
        }
        case 'JOIN_QUIZ_FAILED': {
            return {...state, accepted: false, message: action.payload}
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
            return { ...state, roundNumber: action.payload, questionNumber: 0, started: true}
        }
        case 'NEW_QUESTION': {
            return {...state, fetchQuestions: true, answers: '', questionNumber: state.questionNumber + 1}
        }
        case 'GET_QUESTIONS': {
            return {...state, fetchQuestions: false, currentQuestion: action.payload}
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
        case 'DISCONNECTED_MASTER_LEFT': {
            return {...initialQuizState, refresh: true}
        }
        case 'QUIZ_ENDED':{
            return {...state, started: false}
        }
        case 'END_RESULTS': {
            return { ...state, showEndResults: true }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
