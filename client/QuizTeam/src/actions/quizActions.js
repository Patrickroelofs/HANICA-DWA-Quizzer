import axios from 'axios'
import {webSocket} from "./sessionActions";

const port = 3001;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`


export const JOIN_QUIZ_SUCCESS = 'JOIN_QUIZ_SUCCESS'
export const GET_TEAMS = 'GET_TEAMS'


export function joinQuizSuccess(payload) {
    return {
        type: JOIN_QUIZ_SUCCESS,
        payload: payload,
    }
}

export function joinQuiz(roomCode, teamName) {
    return (dispatch) => {
        axios.post(serverFetchBase + `/teams/${teamName}`,
            {roomCode: roomCode},
            {withCredentials: true}).then(() => {
                dispatch(joinQuizSuccess())
                dispatch(webSocket())
        })
    }
}

function ActionGetTeams(payload) {
    return {
        type: GET_TEAMS,
        payload: payload,
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
                console.log(data)
                dispatch(ActionGetTeams(data))
            })
    }
}
