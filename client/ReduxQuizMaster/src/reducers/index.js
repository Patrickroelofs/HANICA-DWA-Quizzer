import { combineReducers } from 'redux'
import quizReducer from './quizReducer'

export const RootReducer = combineReducers({
    quiz: quizReducer
})