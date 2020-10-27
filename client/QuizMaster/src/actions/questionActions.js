import {sendMessage} from "./sessionActions";
import { store } from './../store'

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

            await fetch(`http://localhost:3001/round/${roundNumber}/question/${store.getState().questions.questionNumber}`, options)
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
                body: JSON.stringify({review: review, team: teamName})
            }
            await fetch(`http://localhost:3001/round/${store.getState().quiz.roundNumber}/review/${store.getState().questions.questionNumber}`, options)
            .then(dispatch({type: 'SEND_REVIEW'}))
        }
        catch (err) {
            console.log('error (function sendReview)', err)
        }}
}

export function getAnswer() {
    return async (dispatch) => {
        try {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors"
            }
            await fetch(`http://localhost:3001/round/${store.getState().quiz.roundNumber}/answer/${store.getState().questions.questionNumber}`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: 'GET_ANSWERS', payload: data})
                })
        }
        catch (err) {
            console.log('error (function sendReview)', err)
        }
    }
}