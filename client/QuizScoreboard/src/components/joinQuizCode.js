import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {getAnswer, getTeams, joinQuiz} from '../actions/quizActions'

export const JoinQuizCode = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const accepted = useSelector((state) => state.quiz.accepted)
    const started = useSelector((state) => state.quiz.started)

    useEffect(() => {
        if(started === false){
            dispatch({type: 'DISCONNECTED_MASTER_LEFT'})
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO: Check here if roomCode exists in database

        if(!isNaN(e.target.roomCode.value) && e.target.roomCode.value.length === 4) {
            dispatch(joinQuiz(e.target.roomCode.value)).then(() => {
                history.push('/waitingroom')
            })
        }
    }

    return (
        <div className='joinQuizCode'>
                <h1>Quizzer</h1>

                <form onSubmit={handleSubmit}>
                    <input className='input' type="text" name="roomCode" placeholder='Game PIN' />
                    <button className='button' type="submit">
                        Enter
                    </button>
                </form>
            {accepted === false
            ? <p>sorry this room has already started</p>
            : null}
        </div>
    )
}

export default JoinQuizCode