import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTeams, getAnswer, getQuestions } from '../actions/quizActions'
import { translate } from '../functions/language';

export const Quiz = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion)
    const language = useSelector(state => state.quiz.language)
    const answers = useSelector((state) => state.quiz.answers)
    const fetchTeams = useSelector((state) => state.quiz.fetchTeams)
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const fetchAnswers = useSelector((state) => state.quiz.fetchAnswers)
    const fetchQuestions = useSelector((state) => state.quiz.fetchQuestions)
    const roundNumber = useSelector((state) => state.quiz.roundNumber)
    const closeQuestion = useSelector((state) => state.quiz.closeQuestion)
    const teams = useSelector((state) => state.quiz.teams)
    const questionNumber = useSelector((state) => state.quiz.questionNumber)

    useEffect(() => {
        if(fetchQuestions === true) {
            dispatch(getQuestions(roundNumber))
        }
    })

    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        }

        if (fetchAnswers === true) {
            dispatch(getAnswer())
        }

        if (closeQuestion === true) {
            dispatch({type: 'CLOSE_QUESTION'})
            history.push('/answers')
        }
    })

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='quiz'>
            <h3>{translate(language, 'questionumber')} {questionNumber} / 12 <br /> {translate(language, 'roundnumber')} {roundNumber} / 3</h3>
            <h2>{currentQuestion.category}</h2>
            <br />
            <h1>{currentQuestion.question}</h1>

            { answers && teams
                ? teams.map((team) => {
                    return answers.map((a) => {
                        if(team.name === a.team) {
                            return (
                                <div className='answer'>
                                    {a.answer
                                      ? (
                                            <h2>
                                                <span className='teamMoji'>{team.teamMoji}</span>
                                                {a.team} : {translate(language, 'hasAnswered')}
                                            </h2>
                                      )
                                      : null
                                    }
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                }) 

                : null
            }
        </div>
    )
}

export default Quiz
