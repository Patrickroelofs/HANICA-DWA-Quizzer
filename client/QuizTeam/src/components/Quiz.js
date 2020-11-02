import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {sendAnswer} from "../actions/quizActions";
import { translate } from '../functions/language'

export const Quiz = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const question = useSelector(state => state.quiz.question)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const language = useSelector(state => state.quiz.language)
    const closeQuestion = useSelector(state => state.quiz.closeQuestion)
    const teamMoji = useSelector(state => state.quiz.teamMoji)
            
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.answer.value !== '') {
            dispatch(sendAnswer(e.target.answer.value)).then(() => {
                history.push('/answered')
            })
        }
    }
    
    useEffect(() => {
        if(closeQuestion === true) {
            dispatch({type: 'CLOSE_QUESTION'})
            history.push('/waitingroom')
        }
    })

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='quiz'>
            {question
                ? <div>
                    <span className='teamMoji'>{teamMoji}</span>
                    <h2>{question.category}</h2>
                    <br />
                    <h1>{question.question}</h1>
            </div>
            :null}

            <form method='post' onSubmit={handleSubmit}>
                <input className='input' name='answer' type='text' placeholder={`${translate(language, 'sendAnswerPlaceholder')}`}/>
                <button className='button' type="submit" value="Submit">{translate(language, 'sendAnswer')}</button>
            </form>

        </div>
    )
}

export default Quiz