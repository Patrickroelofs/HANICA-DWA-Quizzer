import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {sendAnswer} from "../actions/quizActions";


export const Quiz = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const question = useSelector(state => state.quiz.question)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const closeQuestion = useSelector(state => state.quiz.closeQuestion)

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
                    <h3>{question.category}</h3>
                    <h1>{question.question}</h1>
            </div>
            :null}

            <form method='post' onSubmit={handleSubmit}>
                <input className='input' name='answer' type='text' placeholder='put your answer here..'/>
                <button className='button' type="submit" value="Submit">Send Answer</button>
            </form>

        </div>
    )
}

export default Quiz