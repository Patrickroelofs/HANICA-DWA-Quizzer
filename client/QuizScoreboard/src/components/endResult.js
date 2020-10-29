import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const EndResult = () => {
    const history = useHistory()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const answers = useSelector((state) => state.quiz.answers)
    const teams = useSelector((state) => state.quiz.teams)

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='endresult'>
            <h1>Answers</h1>

            <div className='endresultlist'>
                {teams && answers
                    ? teams.map((team) => {
                        return answers.map((answer) => {
                            if(team.name.toString() === answer.team.toString()) {
                                return (
                                    <div key={team.name} className='team'>
                                        <h2 key={team.name}>{team.name}</h2>
                                        <p>{answer.answer}</p>
                                        <span>{team.roundPoints}</span>
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

export default EndResult
