import {sendMessage} from "./sessionActions";

function ActionSendQuestion(payload) {
    return {
        type: 'SEND_QUESTION',
        payload: payload
    }
}

export function sendQuestion(question) {
    return (dispatch) => {
        dispatch(sendMessage(JSON.stringify({type: 'NEW_QUESTION', question: question.question})))
        dispatch(ActionSendQuestion(question))
    }
}