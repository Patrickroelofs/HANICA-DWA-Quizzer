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
        <div>
            {roundNumber > 3
                ? <p>3 rondes gespeeld :)</p>
                : <button onClick={newRound}>New round ({roundNumber}/3)</button>
            }

            <button onClick={endQuiz}>End Quiz</button>
        </div>
    )
}

export default EndQuiz