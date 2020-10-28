import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'
import { useHistory } from 'react-router-dom'
import {sendQuestion, updateQuestion} from "../actions/questionActions";

export const SendQuestions = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questions.all)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const randomizedQuestions = useSelector(state => state.questions.randomized)

    useEffect(() => {
        dispatch(randomQuestions(questions))
    }, [dispatch, questions])

    const refreshQuestions = () => {
        dispatch(randomQuestions((questions)))
    }

    const send = (question) => {
        dispatch(updateQuestion(question, roundNumber))
        history.push('/review')
    }

    return (
        <div class='sendQuestions'>
            <h1>Choose a question and send it to the teams!</h1>
            <button className='button full' onClick={refreshQuestions}>Nieuwe vragen laden...</button>
            <hr />
            
            {
                randomizedQuestions >= 0
                ? null
                : randomizedQuestions.map((q) => {
                    return (
                        <div className='questionList' key={q._id}>
                            <button className='button full' onClick={() => send(q)}>{q.question}</button>
                            <br />
                        </div>

                    )
                })
            }
        </div>
    )
}

export default SendQuestions