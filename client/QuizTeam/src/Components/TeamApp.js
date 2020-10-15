import React ,{useState, useEffect} from 'react';
import '../css/App.css';
import { uniq } from 'lodash'
import {
    openWebSocket,
    joinRoom
} from '../serverCommunication';

function TeamApp (props) {
    const [roomCode, setRoomCode] = useState("")
    const [teamName, setTeamName] = useState("")
    const [messageList, setMessageList] = useState([])
    async function joinQuiz(e){
        e.preventDefault()
        const response = await joinRoom(roomCode, teamName)
        console.log(response)
        await makeSocket()
    }
    async function makeSocket(){
        const ws = await openWebSocket()
        ws.onerror = () => console.log('WebSocket error');
        ws.onopen = () => console.log('WebSocket connection established');
        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onmessage = (msg) => analyzeMessage(msg)
        console.log(ws)
    }
    function analyzeMessage(msg){
        const jsonMessage = JSON.parse(msg.data)
        console.log(jsonMessage)
        console.log(jsonMessage.type)
        switch (jsonMessage.type){
            case 'TEAM_REFUSED':
                setMessageList((prevArr) => ([...prevArr, jsonMessage.type]))
                break
            case 'TEAM_ACCEPTED':
                setMessageList((prevArr) => ([...prevArr, jsonMessage.type]))
                break
            default:
                break
        }
    }

return (
    <div>
        <form method='post' onSubmit={joinQuiz}>
            <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder='team name...'/>
            <input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder='room code...'/>
            <button type="submit" value="Submit" className='submitTeamButton'>Login & create websocket</button>
        </form>
        <p>{roomCode}</p>
        <div>
            {messageList.map(m => {return (
                <div key={m}>
                    <li >{m}</li>
                </div>)})}
        </div>
    </div>
)
}


export default TeamApp;
