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

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }
    
    return (
        <div className='joinQuizForm'>
            <h1>QuizzerTeam</h1>
            {roomCode === ''
                ?   <form method='post' onSubmit={handleSubmit}>
                        <input className='input' name='teamName' type='text' placeholder='team name...'/>
                        <input className='input second' name='roomCode' type='text' placeholder='room code...'/>
                        <button className='button' type="submit" value="Submit">Inloggen met teamnaam</button>
                    </form>
                : accepted !== false
                    ? <p>Waiting for review from Quiz master of room {roomCode} </p>
                    : <p>Sorry rejected</p>
            }
        </div>
    )
}

export default JoinQuizForm