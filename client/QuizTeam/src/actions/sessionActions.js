import { getTeams } from "./quizActions";
import {store} from "../store";

const port = 3001
const server = `ws://${window.location.hostname}:${port}`

let wsConnection

export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN'
export const WEBSOCKET_MESSAGE = ''

// ================== MESSAGES FROM THE SOCKET ====================
export const TEAM_ACCEPTED = 'TEAM_ACCEPTED'
export const TEAM_REFUSED = 'TEAM_REFUSED'

function websocket_open(websocket) {
    return {
        type: WEBSOCKET_OPEN,
        payload: websocket,
    }
}

export function sendMessage(message){
    wsConnection.send(message)
}

export function webSocket() {
    return (dispatch) => {
        console.log(store.getState().quiz.accepted)
        if(wsConnection === undefined ) {
            wsConnection = new WebSocket(server)
        }else if(store.getState().quiz.accepted === undefined) {
            wsConnection.close()
            wsConnection = new WebSocket(server)
        }

        wsConnection.onmessage = (e) => {
            console.log('WEBSOCKET DATA: ', e.data)
            if(e.data.type === 'TEAM_JOINED'){
                dispatch(getTeams())
            }
            dispatch(JSON.parse(e.data))
        }

        wsConnection.onopen = (e) => {
            console.log('WEBSOCKET OPEN: ', e)
            dispatch(websocket_open(wsConnection))
        }

        wsConnection.onclose = (e) => {
            wsConnection = undefined
            console.log('WEBSOCKET CLOSED: ', e)
        }

        wsConnection.onerror = (e) => {
            console.log('WEBSOCKET ERROR: ', e)
        }
    }
}
