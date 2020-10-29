import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTeams } from '../actions/quizActions'

export const Answers = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const answers = useSelector((state) => state.quiz.answers)
    const teams = useSelector((state) => state.quiz.teams)
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion)
    const fetchQuestions = useSelector((state) => state.quiz.fetchQuestions)

    useEffect(() => {
        dispatch(getTeams(roomCode))
    }, [])

    useEffect(() => {
        if(fetchQuestions) {
            history.push('/quiz')
        }
    })

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='answers'>
            <h1>Answers</h1>
            <h3>Right Answer : {currentQuestion.answer}</h3>
            <div className='answerlist'>
                {teams && answers
                    ? teams.map((team) => {
                        return answers.map((answer) => {
                            if(team.name.toString() === answer.team.toString()) {
                                return (
                                    <div key={team.name} className='team'>
                                        <h2 key={team.name}>{team.name}</h2>
                                        <p>{answer.answer}</p>
                                        <span>Correct: {team.roundScore} / 12</span>
                                    </div>
                                )
                            }
                        })

                      })
                    : null}
            </div>
        </div>
    )
}

export default Answers
