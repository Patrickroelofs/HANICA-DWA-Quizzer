import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { translate } from '../functions/language'
export const Answered = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const answer = useSelector(state => state.quiz.answer)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const language = useSelector(state => state.quiz.language)
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

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='answered'>
            <h1>{translate(language, 'answered')}</h1>
            <h2>{answer}</h2>
            <button className='button' onClick={newAnswer}>{translate(language, 'answerchanges')}</button>
        </div>
    )
}

export default Answered