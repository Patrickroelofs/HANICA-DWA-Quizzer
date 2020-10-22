import React, {useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'



export const JoinQuizForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const accepted = useSelector(state => state.quiz.accepted)
    const roomCode = useSelector(state => state.quiz.roomCode)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(joinQuiz(e.target.roomCode.value, e.target.teamName.value))
        if(accepted) {
            history.push('/waitingroom')
        }
    }
    useEffect(() => {
        if(accepted){
            history.push('/waitingroom')
        }
    }, [accepted, history])
    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <input name='teamName' type='text' placeholder='team name...'/>
                <input name='roomCode' type='text' placeholder='room code...'/>
                <button type="submit" value="Submit" className='submitTeamButton'>Login & create websocket</button>
            </form>
            <div>
                {roomCode === ''
                ? null
                : accepted !== false
                        ?  <p>Waiting for review from Quiz master of room {roomCode} </p>
                        :  <p>Sorry rejected</p>}


            </div>
        </div>
    )
}

export default JoinQuizForm