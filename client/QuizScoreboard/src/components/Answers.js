import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../actions/quizActions'

export const Answers = () => {
    const dispatch = useDispatch()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const answers = useSelector((state) => state.quiz.answers)
    const teams = useSelector((state) => state.quiz.teams)
    
    useEffect(() => {
        dispatch(getTeams(roomCode))
    }, [])

    return (
        <div className='answers'>
            <h1>Answers</h1>

            <div className='answerlist'>
                {teams
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

        // answers
        // correct
        // punten verdiend per team?
    )
}

export default Answers
