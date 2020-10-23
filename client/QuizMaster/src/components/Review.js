import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'
import { useHistory } from 'react-router-dom'
import {sendQuestion} from "../actions/questionActions";

export const Review = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const question = useSelector(state => state.questions.currentQuestion)
    const answers = useSelector(state => state.questions.answer)


    const send = (review) => {
        //todo make this exist so that the review can be sent back
        //dispatch(sendReview(review))

    }

    return (
        <div>
            {question
            ? <React.Fragment>
                    <h1>{question.question}</h1>
                    <h4>answer: {question.answer}</h4>
                    <p>{answers}</p>
                </React.Fragment>
            : null}
        </div>
    )
}

export default Review