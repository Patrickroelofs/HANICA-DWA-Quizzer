import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'

export const JoinQuizCode = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        //TODO: Check here if roomCode exists in database

        if(!isNaN(e.target.roomCode.value) && e.target.roomCode.value.length === 4) {
            dispatch(joinQuiz(e.target.roomCode.value))
            history.push('/waitingroom')
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
        </div>
    )
}

export default JoinQuizCode