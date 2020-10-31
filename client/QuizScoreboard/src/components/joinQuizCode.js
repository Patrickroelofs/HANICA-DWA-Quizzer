import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {getAnswer, getTeams, joinQuiz} from '../actions/quizActions'

export const JoinQuizCode = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const accepted = useSelector((state) => state.quiz.accepted)
    const started = useSelector((state) => state.quiz.started)
    const message = useSelector((state) => state.quiz.message)


    useEffect(() => {
        if(started === false){
            dispatch({type: 'DISCONNECTED_MASTER_LEFT'})
        }
        if(accepted === true){
            history.push('/waitingroom')
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO: Check here if roomCode exists in database

        if(!isNaN(e.target.roomCode.value) && e.target.roomCode.value.length === 4) {
            dispatch(joinQuiz(e.target.roomCode.value))
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
            ? <p>{message}</p>
            : null}
        </div>
    )
}

export default JoinQuizCode