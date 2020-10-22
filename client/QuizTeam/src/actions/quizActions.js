import { webSocket } from "./sessionActions";
import { sendMessage } from "./sessionActions";

export const JOIN_QUIZ_SUCCESS = 'JOIN_QUIZ_SUCCESS'
export const GET_TEAMS = 'GET_TEAMS'
export const SEND_ANSWER = 'SEND_ANSWER'

export function joinQuiz(roomCode, teamName) {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({roomCode: roomCode})
        }

        fetch(`http://localhost:3001/teams/${teamName}`, options)
            .then(() => {
                dispatch({type: JOIN_QUIZ_SUCCESS, payload: roomCode})
                dispatch(webSocket())
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

export function sendAnswer(answer) {
    return (dispatch) => {
        dispatch({type: SEND_ANSWER, payload: answer})
        dispatch(sendMessage(JSON.stringify({type: 'ANSWER', answer:answer})))
    }
}