import React ,{useState, useEffect} from 'react';
import '../css/App.css';
import { uniq } from 'lodash'
import {
    addTeam,
    openWebSocket, removeTeam,
    startCreationRoom,
} from '../serverCommunication';

function MasterApp (props) {
    const [roomCode, setRoomCode] = useState("")
    const [messageList, setMessageList] = useState([])

    async function startQuiz(){
        const response = await startCreationRoom()
        setRoomCode(response.data.roomCode)
        await makeSocket()

    }
    async function addTeams(roomCode){
        const thing = await addTeam(roomCode)
        console.log(thing)
    }
    function analyzeMessage(msg){
        let json
        console.log(msg.data)
        if(!msg.data.type) {
            json = JSON.parse(msg.data)
        }else{
            json = msg.data
        }
        console.log(json.type)
        switch (json.type){
            case 'TEAM_JOINED':
                setMessageList((prevArr) => ([...prevArr, json.teamName]))
                break
            case 'DELETED':
                console.log(' deleting')
                setMessageList(() => messageList.filter((e)=>(e !== json.team)))
                break
            default:
                break
        }
    }
    async function refuseTeam(team){
        let response = await removeTeam(team, roomCode)
        analyzeMessage(response)
    }

    async function makeSocket(){
       const ws = await openWebSocket()
        ws.onerror = () => console.log('WebSocket error');
        ws.onopen = () => console.log('WebSocket connection established');
        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onmessage = (msg) => analyzeMessage(msg)
        console.log(ws)
    }
    return (
        <div>
            <button onClick={startQuiz}>Start quiz</button>
            <div>{messageList.map(m => {return (
                <div key={m}>
                <li >{m}</li>
                    <button onClick={() => refuseTeam(m)}>Reject</button>
                </div>)})}
            </div>
            <p>{roomCode}</p>
        </div>
    )
}


export default MasterApp;