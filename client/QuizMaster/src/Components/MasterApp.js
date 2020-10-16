import React ,{useState, useEffect} from 'react';
import '../css/App.css';
import { uniq } from 'lodash'
import {
    getQuizInfo,
    openWebSocket, removeTeam,
    startCreationRoom,
    getWebSocket,
    getCategories,
    getQuest, getQuestionsOfCategory
} from '../serverCommunication';

function MasterApp (props) {
    const [roomCode, setRoomCode] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [categories, setCategories] = useState([])
    const [acceptedTeams, setAcceptedTeams] = useState([])
    const [chosenCat, setChosenCat] = useState([])
    const [currentQuestionsShown, setCurrentQuestionsShown] = useState([])
    const [currentCat, setCurrentCat] = useState('')
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
    async function getGofC(cat){
       const response = await getQuestionsOfCategory(cat)
        setCurrentCat(cat)
        setCurrentQuestionsShown([])
        response.data.forEach(question => setCurrentQuestionsShown((prevArr) => ([...prevArr, question])))
    }
    function onSend(type, message, extra) {
        const ws = getWebSocket();
        let m = {type: type, message: message, teamName:extra}
        ws.send(JSON.stringify(m))
    }
    function choosingCategories(cat){
        if(chosenCat.length === 3){
            const first = chosenCat[0]
            setChosenCat(() => chosenCat.shift())
            console.log(cat)
            setChosenCat(chosenCat.filter((e)=>(e !== first)))
            setChosenCat((prevArr) => ([...prevArr, cat]))
        }else{
            setChosenCat((prevArr) => ([...prevArr, cat]))

        }
    }
    return (
        <div>
            <button onClick={startQuiz}>Start quiz</button>
            <h3>RoomCode: {roomCode}</h3>
            <hr/>
            <h3>Joined Teams ({messageList.length})</h3>
            <ul>
                <div>{messageList.map(m => {return (
                    <div key={m}>
                    <li >{m}</li>
                        {acceptedTeams.includes(m) ?
                            null
                            :
                            <div>
                                <button onClick={() => refuseTeam(m)}>Reject</button>
                                <button onClick={() => {setAcceptedTeams((prevArr) => ([...prevArr, m])); onSend('TEAM_ACCEPTED', '', m); }}>Accept</button>
                            </div>
                        }
                    </div>)})}
                </div>
            </ul>
            <button onClick={getC}>Start Round ({acceptedTeams.length})</button>
            <hr/>
            <h3>Choose categories ({chosenCat.length}/3):</h3>
                <p>press once to select category, press twice to see questions (can't select more than 3)</p>
                <div>
                    {categories ? categories.map(c => {return (
                        chosenCat.includes(c)
                            ? <button onClick={() => getGofC(c)} key={c}><b>{c}</b></button>
                            : <button onClick={() => choosingCategories(c)} key={c}>{c}</button>
                    )}): null}
                </div>
            <hr/>
            <h3>Questions of {currentCat}</h3>
                <div>
                    {currentQuestionsShown
                        ? currentQuestionsShown.map(q => {return(<li key={q._id}>{q.question}</li>)})
                        : null
                    }
                </div>
        </div>
    )
}


export default MasterApp;
