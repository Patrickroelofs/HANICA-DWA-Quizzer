import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export const Answered = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const answer = useSelector(state => state.quiz.answer)
    const closeQuestion = useSelector(state => state.quiz.closeQuestion)

    useEffect(() => {
        if(closeQuestion === true) {
            dispatch({type: 'CLOSE_QUESTION'})
            history.push('/waitingroom')
        }
    })

    const newAnswer = () => {
        history.push('/quiz')
    }

    return (
        <div>
            <h1>Je hebt geantwoord :)~!</h1>
            <h2>{answer}</h2>
            <button onClick={newAnswer}>Nieuw antwoord geven</button>
        </div>
    )
}

export default Answered