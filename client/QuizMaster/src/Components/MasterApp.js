import React ,{useState, useEffect} from 'react';
import '../css/App.css';
import { uniq } from 'lodash'
import {
    getQuizInfo,
    openWebSocket, removeTeam,
    startCreationRoom,
    getWebSocket,
    getCategories,
    getQuest
} from '../serverCommunication';

function MasterApp (props) {
    const [roomCode, setRoomCode] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [categories, setCategories] = useState([])

    async function startQuiz(){
        const response = await startCreationRoom()
        setRoomCode(response.data.roomCode)
        await makeSocket()

    }
    async function getQuizData(r, todo){
        const response = await getQuizInfo(r)
        const teamsArray = response.data.teams
        if(todo ===  'ADD') {
            setMessageList([])
            teamsArray.forEach(team => {
                setMessageList((prevArr) => ([...prevArr, team.name]))
            })
        }else{
            setMessageList([])
            teamsArray.forEach(team => {
                setMessageList((prevArr) => ([...prevArr, team.name]))
            })
        }
        return response
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
                let roomcode = json.roomCode
                getQuizData(roomcode, 'ADD').then(r => console.log(r))
                break
            case 'TEAM_DELETED':
                let c = json.roomCode
                getQuizData(c, 'DELETE').then(r => console.log(r))
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
    async function getC() {
        const catagories = await getCategories()
        console.log(catagories.data)
        setCategories([])
        catagories.data.forEach(c => {
            setCategories((prevArr) => ([...prevArr, c]))
        })
    }
    function onSend(type, message, extra) {
        const ws = getWebSocket();
        let m = {type: type, message: message, teamName:extra}
        ws.send(JSON.stringify(m))
    }
    return (
        <div>
            <button onClick={startQuiz}>Start quiz</button>
            <h5>RoomCode: {roomCode}</h5>
            <hr/>
            <h5>Joined Teams ({messageList.length})</h5>
            <ul>
                <div>{messageList.map(m => {return (
                    <div key={m}>
                    <li >{m}</li>
                        <button onClick={() => refuseTeam(m)}>Reject</button>
                        <button onClick={() => onSend('TEAM_ACCEPTED', '', m )}>Accept</button>
                    </div>)})}
                </div>
            </ul>
            <button onClick={getC}>Start Round ({messageList.length})</button>
            <hr/>
            <h5>Catagories:</h5>
                <div>
                    {categories ? categories.map(c => {return (
                        <button key={c}>{c}</button>
                    )}): null}
                </div>
            <hr/>
            <h5>Questions of ..</h5>
                <div>

                </div>
        </div>
    )
}


export default MasterApp;
