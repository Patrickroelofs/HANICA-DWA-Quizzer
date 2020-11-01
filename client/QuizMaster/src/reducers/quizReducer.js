import { ACCEPT_TEAM, REMOVE_TEAM, GET_TEAMS } from '../actions/teamActions'
import {CREATE_QUIZ, CREATE_ROUND, START_QUIZ} from '../actions/quizActions'

const initialQuizState = {
    roomCode: '',
    roundNumber: 0,
    language: '',
    fetchTeams: false,
    startQuiz: false,
    fetchAnswers: false,
    scoreboard: false,
    connectedTeams: [],
    acceptedTeams: [],
    answers: [],
    endResults: false,
    reviews : []
}
//198,79

const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        case 'ANSWER': {
            return {
                ...state,
                fetchAnswers: true
            }
        }

        case 'RESET_STATE': {
            return {
                ...initialQuizState
            }
        }

        case CREATE_QUIZ: {
            return {
                ...state,
                language: action.language,
                roomCode: action.roomCode,
                fetchTeams: true,
            }
        }

        case GET_TEAMS: {
            return {
                ...state,
                fetchTeams: false,
                connectedTeams: action.payload
            }
        }

        case 'TEAM_JOINED': {
            return {
                ...state,
                fetchTeams: true,
            }
        }

        case ACCEPT_TEAM: {
            return {
                ...state,
                acceptedTeams: [...state.acceptedTeams, action.payload]
            }
        }
        case 'SEND_REVIEW': {
            console.log(action.payload)
            let i = state.reviews.findIndex(team => team.name === action.payload.name)
            console.log(i)
            if(i !== -1){
                return {
                    ...state,
                    reviews: [
                        ...state.reviews.slice(0,i),
                        {name: state.reviews[i].name, review: action.payload.review},
                        ...state.reviews.slice(i+1)
                    ]

                }
            }else{
                return {
                    ...state,
                    reviews: [...state.reviews, action.payload]
                }
            }

        }
        case REMOVE_TEAM: {
            return {
                ...state,
                fetchTeams: true
            }
        }
        case START_QUIZ: {
            return {
                ...state,
                startQuiz: true,
            }
        }
        case CREATE_ROUND: {
            return {
                ...state,
                roundNumber: action.payload
            }
        }
        case 'GET_ANSWERS':
            const r = state.answers.filter(({answer: id1}) => !action.payload.some(({answer: id2}) => id2 === id1))
            console.log(r)
            if(r.length >= 1){
                let teamChanged = r[0].team
                console.log(teamChanged)
                let i = state.reviews.findIndex(t => t.name === teamChanged)
                console.log(i)
                state.reviews[i].review = undefined
            }

            return {
                ...state,
                fetchAnswers: false,
                answers: action.payload
            }

        case 'QUESTION_CLOSED': 
            return {
                ...state,
                answers: [],
                reviews: []
            }
        case 'SCOREBOARD_JOINED':
            return {
                ...state,
                scoreboard: true
            }
        case 'END_RESULTS': 
            return {
                ...state,
                endResults: true
            }
        default: {
            return state
        }
    }
}

export default quizReducer
