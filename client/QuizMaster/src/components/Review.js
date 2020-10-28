import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'
import { useHistory } from 'react-router-dom'
import {getAnswer, sendReview} from "../actions/questionActions";
import {getTeams} from "../actions/teamActions";
import { closeQuestion } from '../actions/quizActions';

export const Review = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const question = useSelector(state => state.questions.currentQuestions)
    const answer = useSelector(state => state.questions.answer)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const fetchAnswers = useSelector(state => state.quiz.fetchAnswers)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const answers = useSelector(state => state.quiz.answers)
    const questionNumber = useSelector(state => state.questions.questionNumber)


    const send = (review, teamName) => {
        //todo make this exist so that the review can be sent back
        dispatch(sendReview(review, teamName))
    }

    const close = () => {
        if(questionNumber >= 2) {
            dispatch(closeQuestion())
            history.push('/endQuiz')

        } else {
            dispatch(closeQuestion())
            history.push('/sendQuestions')

        }

    }

    useEffect(() => {

        if(fetchTeams) {
            dispatch(getTeams(roomCode))
        }

    }, [answer, dispatch, fetchTeams, getAnswer, roomCode])

    useEffect(() => {
        if(fetchAnswers) {
            dispatch(getAnswer())
        }
    })

    return (
        <div>
            {question
                ? <React.Fragment>
                    <h1>{question.question}</h1>
                    <h3>{question.answer}</h3>
                </React.Fragment>
            : null}
            {answers
                ? answers.map(a => {return (
                    <div key={a.name}>
                    <h4>{a.team}</h4>
                        {a.answer ?
                            <div><p>{a.answer}</p>
                                {a.review === undefined
                                    ? <div>
                                        <button onClick={() => send(true, a.team)}>right</button>
                                        <button onClick={() => send(false, a.team)}>wrong</button>
                                      </div>
                                    : <p>{a.review}</p>}
                                 </div>
                            : <p>waiting for answer</p>}
                    </div>)})
                :null}
                <button onClick={close}>Close Question</button>
        </div>
    )
}

export default Review