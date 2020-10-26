import {sendMessage} from "./sessionActions";

export const NEW_QUESTION = 'NEW_QUESTION'
export const SEND_QUESTION = 'SEND_QUESTION'

export function updateQuestion(question, roundNumber){
    return async (dispatch) => {
        try {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify(question)
            }

            await fetch(`http://localhost:3001/round/${roundNumber}/question`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: SEND_QUESTION, payload: question})
                })

        } catch (e) {
            console.log("error (function getQuestions)", e)
        }
    }
}

export function sendReview(review, teamName){
    return async (dispatch) => {
        try {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify({review : review, teamName :teamName})
            }
            await fetch(`http://localhost:3001/teams/answer`, options).then(
                dispatch({type: 'SEND_REVIEW'})
            )
        }
        catch (err) {
            console.log('error (function sendReview)', err)
        }}
}