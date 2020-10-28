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
        <div>
            <h1>Answers</h1>

            <div className="teamList">
                {teams
                    ? teams.map((team) => {
                        return answers.map((answer) => {
                            if(team.name.toString() === answer.team.toString()) {
                                return (
                                    <div>
                                        <div>
                                            <img
                                                alt=""
                                                width="150px"
                                                src={`${process.env.PUBLIC_URL}/img/undraw_profile_pic_ic5t.svg`}
                                            />
                                        </div>
                                        <p key={team.name}>{team.name}</p>
                                        <p>{answer.answer}</p>
                                        <p>Correct: {team.roundScore} / 12</p>
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
