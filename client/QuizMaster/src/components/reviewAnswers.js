import React from 'react'
import { useSelector } from 'react-redux'

export const ReviewAnswers = () => {
    const question = useSelector(state => state.questions.currentQuestion)
    const answers = useSelector(state => state.questions.answer)


    //const send = (review) => {
        //todo make this exist so that the review can be sent back
        //dispatch(sendReview(review))

    //}

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

export default ReviewAnswers