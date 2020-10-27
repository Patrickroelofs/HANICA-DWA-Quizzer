import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {sendAnswer} from "../actions/quizActions";


export const Quiz = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const question = useSelector(state => state.quiz.question)
    const roomCode = useSelector(state => state.quiz.roomCode)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendAnswer(e.target.answer.value)).then(() => {
            history.push('/answered')
        })
    }

    return (
        <div>
            <h6>{roomCode}</h6>
            <h1>{question}</h1>
            <form method='post' onSubmit={handleSubmit}>
                <input name='answer' type='text' placeholder='put your answer here..'/>
                <button type="submit" value="Submit" className='submitAnswerButton'>Send Answer</button>
            </form>

        </div>
    )
}

export default Quiz