import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'
import { useHistory } from 'react-router-dom'
import {sendQuestion, updateQuestion} from "../actions/questionActions";
import { translate } from '../functions/language'

export const SendQuestions = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector(state => state.quiz.roomCode)
    const questions = useSelector(state => state.questions.all)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const randomizedQuestions = useSelector(state => state.questions.randomized)
    const language = useSelector(state => state.quiz.language)

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

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='sendQuestions'>
            <h1>{translate(language, 'chooseaQuestion')}</h1>
            <button className='button full' onClick={refreshQuestions}>{translate(language, 'refreshQuestions')}</button>
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