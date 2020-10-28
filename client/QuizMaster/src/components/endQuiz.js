import { round } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const EndQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const roundNumber = useSelector(state => state.quiz.roundNumber)
    
    const newRound = () => {
        dispatch({type: 'NEW_ROUND'})
        history.push('/categories')
    }

    const endQuiz = () => {

    }

    return (
        <div className='endQuiz'>
            {roundNumber > 3
                ? null
                : <h1>Nieuwe ronde starten?</h1>
            }

            {roundNumber > 3
                ? <h1>3 rondes gespeeld :)</h1>
                : <button className='button full' onClick={newRound}>New round ({roundNumber}/3)</button>
            }

            <button className='button full' onClick={endQuiz}>End Quiz</button>
        </div>
    )
}

export default EndQuiz