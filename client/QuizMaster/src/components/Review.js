import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {getAnswer, sendReview} from "../actions/questionActions";
import {getTeams} from "../actions/teamActions";
import { closeQuestion } from '../actions/quizActions';
import { translate } from '../functions/language'

export const Review = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const question = useSelector(state => state.questions.currentQuestions)
    const answer = useSelector(state => state.questions.answer)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const fetchAnswers = useSelector(state => state.quiz.fetchAnswers)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const answers = useSelector(state => state.quiz.answers)
    const language = useSelector(state => state.quiz.language)
    const questionNumber = useSelector(state => state.questions.questionNumber)
    const reviews = useSelector(state => state.quiz.reviews)
    const teams = useSelector(state => state.quiz.acceptedTeams)

    const send = (review, teamName) => {
            dispatch({type: 'SEND_REVIEW', payload: {name : teamName, review :review}})
        }

    const close = () => {
        if(questionNumber >= 12) {
            dispatch(sendReview(reviews)).then(() => {
                dispatch(closeQuestion())
                history.push('/endQuiz')

            })

        } else {
            dispatch(sendReview(reviews)).then(() => {
                dispatch(closeQuestion())
                history.push('/sendQuestions')

            })


        }

    }

    useEffect(() => {

        if(fetchTeams) {
            dispatch(getTeams(roomCode))
        }

    }, [answer, dispatch, fetchTeams, roomCode])

    useEffect(() => {
        if(fetchAnswers) {
            dispatch(getAnswer())
        }
    })
    
    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='review'>
            {question
                ? <React.Fragment>
                    <h2>{question.category}</h2>
                    <br />
                    <h1>{question.question}</h1>
                    <h3>{question.answer}</h3>
                </React.Fragment>
            : null}
            {answers && teams

                ? teams.map((team) => {
                    return answers.map(a => {
                        if(team.name === a.team) {
                            return (
                                <div key={a.team}>
                                    {a.answer
                                    ?   <div>
                                        {reviews.findIndex(t => t.name === a.team) === -1 || reviews[reviews.findIndex(t => t.name === a.team)].review === undefined
                                            ? <div className='reviewteamanswers'>
                                                <p><span className='teamMoji'>{team.teamMoji}</span> {a.team} : {a.answer}</p>
                                                <button className='button' onClick={() => send(true, a.team)}><span aria-label='check' role="img">✔️</span></button>
                                                <button className='button' onClick={() => send(false, a.team)}><span aria-label='nocheck' role="img">❌</span></button>
                                              </div>
            
            
                                            : reviews.map(r => { return(r.name === a.team ? <p><span className='teamMoji'>{team.teamMoji}</span> {r.name + ` : `} {r.review ? '✔️' : '❌'}</p> : null )}  )
                                        }
                                        </div>
                                    : <p>{translate(language, 'waitingForAnswer')}</p>}
                                </div>)
                        } else {
                            return null
                        }
                    })
                })
            
                :null}

                <br />
                <br />
                <button className='button full' onClick={close}>{translate(language, 'closeQuestion')}</button>
        </div>
    )
}

export default Review