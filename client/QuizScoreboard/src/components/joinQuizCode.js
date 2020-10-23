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
            <div className='hero'>
                <div className='waveBG wave1'></div>
                <div className='waveBG wave2'></div>
                <div className='waveBG wave3'></div>
                <div className='waveBG wave4'></div>
                <h1>Quizzer</h1>

                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <input className='input' type="text" name="roomCode" placeholder='Code' />
                        <button className='button' type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fillRule="evenodd" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default JoinQuizCode