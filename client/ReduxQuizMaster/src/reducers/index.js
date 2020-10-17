import { combineReducers } from 'redux'
import quizReducer from './quizReducer'
import questionReducer from './questionReducer'

export const RootReducer = combineReducers({
    quiz: quizReducer,
    questions: questionReducer,
})