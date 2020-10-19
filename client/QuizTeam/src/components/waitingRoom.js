import React from 'react'
import { useDispatch } from 'react-redux'
import { webSocket } from '../actions/sessionActions'


export const WaitingRoom = () => {
    const dispatch = useDispatch()

    const startwebsocket = () => {
        dispatch(webSocket())
    }
    return (
        <div>
            <button onClick={startwebsocket}>Start websocket</button>
            <h1>Waiting for QuizMaster</h1>
        </div>
    )
}

export default WaitingRoom