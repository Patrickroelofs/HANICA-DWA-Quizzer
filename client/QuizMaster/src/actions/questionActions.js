import {sendMessage} from "./sessionActions";

export const NEW_QUESTION = 'NEW_QUESTION'
export const SEND_QUESTION = 'SEND_QUESTION'

export function sendQuestion(question) {
    return (dispatch) => {
        dispatch(sendMessage({type: NEW_QUESTION, question: question.question}))
        dispatch({type: SEND_QUESTION, payload: question})
    }
}