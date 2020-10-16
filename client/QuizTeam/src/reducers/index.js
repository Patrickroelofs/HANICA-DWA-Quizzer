import { combineReducers } from 'redux'
import quizReducer from './quizReducer'
import sessionReducer from "./sessionReducer";

export const RootReducer = combineReducers({
    session : sessionReducer,
    quiz: quizReducer
})