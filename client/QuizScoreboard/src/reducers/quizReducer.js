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
            return { ...state, teams: action.payload, fetchTeams: false }
        }

        case 'TEAM_JOINED': {
            return { ...state, fetchTeams: true }
        }

        case 'TEAM_REFUSED': {
            return { ...state, fetchTeams: true }
        }

        default: {
            return state
        }
    }
}

export default quizReducer
