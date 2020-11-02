import { webSocket } from "./sessionActions";
import { store } from '../store'
import _ from 'lodash'

export const JOIN_QUIZ_SUCCESS = 'JOIN_QUIZ_SUCCESS'
export const GET_TEAMS = 'GET_TEAMS'
export const SEND_ANSWER = 'SEND_ANSWER'
export const GET_QUESTIONS = 'GET_QUESTIONS'

export function joinQuiz(roomCode, teamName, teamMoji) {
    return (dispatch) => {

        let emoji;

        if(teamMoji.toString() === 'random') {
            const emojiList = [
                '😞',
                '😪',
                '👿',
                '🥵',
                '😰',
                '😩',
                '😫',
                '😧'
            ]
            emoji = _.shuffle(emojiList)[0]
        } else {
            emoji = teamMoji
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({roomCode: roomCode, teamMoji: emoji})
        }

        fetch(`http://localhost:3001/teams/${teamName}`, options)
            .then((response) => response.json())
            .then((data) => {
                if(data.worked){
                    dispatch({type: JOIN_QUIZ_SUCCESS, payload: roomCode, language: data.language, teamMoji: emoji})
                    dispatch(webSocket())
                }else {
                    dispatch({type: 'JOIN_QUIZ_FAILED', payload: data.message})
                }
        })
    }
}

export function getTeams(roomCode) {
    return (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        }

        fetch(`http://localhost:3001/teams/${roomCode}`, options)
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: GET_TEAMS, payload: data})
            })
    }
}
export function getQuestions(roundNumber) {
    return (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        }

        fetch(`http://localhost:3001/round/${roundNumber}/question/${store.getState().quiz.questionNumber}`, options)
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: GET_QUESTIONS, payload: data})
            })
    }
}

export function sendAnswer(answer) {
    return async (dispatch) => {
        try {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify({answer:answer})
            }

            await fetch(`http://localhost:3001/round/${store.getState().quiz.roundNumber}/answer/${store.getState().quiz.questionNumber}`, options)
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: SEND_ANSWER, payload: answer})
            })}
            catch (err){
                console.log("error (function SendAnswers)", err)
        }
    }
}