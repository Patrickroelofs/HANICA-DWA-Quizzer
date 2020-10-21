import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'

export const SendQuestions = () => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questions.all)
    const randomizedQuestions = useSelector(state => state.questions.randomized)

    useEffect(() => {
        dispatch(randomQuestions(questions))
    }, [])

    const refreshQuestions = () => {
        dispatch(randomQuestions((questions)))
    }

    return (
        <div>
            <h1>Choose a question and send it to the teams!</h1>
            <button onClick={refreshQuestions}>Load new Questions</button>
            <br /><br />
            
            {
                randomizedQuestions >= 0
                ? null
                : randomizedQuestions.map((q) => {
                    return (
                        <React.Fragment>
                            <button key={q._id}>{q.question}</button>
                            <br />
                        </React.Fragment>

                    )
                })
            }
        </div>
    )
}

export default SendQuestions