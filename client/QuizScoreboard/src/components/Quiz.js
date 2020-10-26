import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getTeams} from "../actions/quizActions";

export const Quiz = () => {
    const dispatch = useDispatch()
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    const teams = useSelector(state => state.quiz.teams)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const roomCode = useSelector(state => state.quiz.roomCode)
    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        }
    })

    return (
        <div>
            <h1>{currentQuestion}</h1>
            {teams.map(team => {return(
                <div>
                    <h3>{team.name}</h3>
                    {team.answer
                    ?team.answer.givenAnswer !== undefined
                            ? <p>Answered!!</p>
                            : null
                    : <p>no answer yet..</p>}

                </div>
            )})}
        </div>

    )
}

export default Quiz