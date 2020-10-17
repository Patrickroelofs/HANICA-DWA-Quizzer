import { combineReducers } from 'redux'
import quizReducer from './quizReducer'
import questionReducer from './questionReducer'
import categoryReducer from './categoryReducer'

export const RootReducer = combineReducers({
    quiz: quizReducer,
    categories: categoryReducer,
    questions: questionReducer
})