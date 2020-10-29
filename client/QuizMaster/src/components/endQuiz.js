import { round } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { calculateScores, deleteQuiz } from '../actions/quizActions'

export const EndQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const roomCode = useSelector(state => state.quiz.roomCode)
    
    const newRound = () => {
        dispatch(calculateScores()).then(() => {
            history.push('/categories')
        })
    }

    const endQuiz = () => {
        dispatch(deleteQuiz())//.then(() => {
            // this makes the error dissapear but then it wont reload on refresh
            // if(window.location.pathname !== '/' && roomCode === '') {
            //     history.push('/')
            // }
        //})
    }

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='endQuiz'>
            {roundNumber >= 3
                ? null
                : <h1>Nieuwe ronde starten?</h1>
            }

            {roundNumber >= 3
                ? <h1>3 rondes gespeeld :)</h1>
                : <button className='button full' onClick={newRound}>New round ({roundNumber}/3)</button>
            }

            <button className='button full' onClick={endQuiz}>End Quiz</button>
        </div>
    )
}

export default EndQuiz