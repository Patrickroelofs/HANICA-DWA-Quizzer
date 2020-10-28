import {sendMessage, webSocket} from "./sessionActions";
import { store } from './../store'

export const CREATE_QUIZ = 'CREATE_QUIZ'
export const START_QUIZ = 'START_QUIZ'
export const CREATE_ROUND = 'CREATE_ROUND'

export function createQuiz(language) {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ language: language }),
        }

        fetch('http://localhost:3001/quiz/', options)
            .then((response) => response.json())
            .then((data) => {
                dispatch(
                    {
                        type: CREATE_QUIZ,
                        language: data.language,
                        roomCode: data.roomCode
                    }
                )
            }).then(() => {
            dispatch(webSocket())
        })
    }
}

export function startQuiz(roundNumber) {
    return (dispatch) => {
        dispatch(sendMessage({type: START_QUIZ, roundNumber: roundNumber}))
        //TODO: Send start quiz to server and have it message all users
        dispatch({type: START_QUIZ, payload: true})
    }
}

export function actionCreateRound(roundNumber) {
    return (dispatch) => {
        dispatch({type: CREATE_ROUND, payload: roundNumber })
    }
}

export function createRound(categories, roundNumber) {
    return async (dispatch) => {
        let newNumber = roundNumber + 1

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                    roomCode: store.getState().quiz.roomCode,
                    roundNumber: newNumber,
                    //TODO: Make this better :)
                    categories0: categories[0],
                    categories1: categories[1],
                    categories2: categories[2]
                })
        }

        fetch('http://localhost:3001/quiz/round', options)
            .then((response) => response.json())
            .then((data) => {
                dispatch(actionCreateRound(newNumber))
                dispatch(startQuiz(newNumber))
            })
    }
}

export function closeQuestion () {
    return async (dispatch) => {
        try {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors"
            }

            await fetch(`http://localhost:3001/quiz/${store.getState().quiz.roundNumber}/close/${store.getState().questions.questionNumber}`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: 'QUESTION_CLOSED'})
                })

        } catch (e) {
            console.log("error (function closeQuestion)", e)
        }
    }
}