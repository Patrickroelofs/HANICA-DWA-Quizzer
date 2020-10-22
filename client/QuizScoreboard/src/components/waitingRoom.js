import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../actions/quizActions'
import { useHistory } from "react-router-dom";

export const WaitingRoom = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const roomCode = useSelector(state => state.quiz.roomCode)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const teams = useSelector(state => state.quiz.teams)
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)

    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        } else {
            dispatch(getTeams(roomCode))
        }
        if (currentQuestion){
            history.push('/quiz')
        }
    }, [fetchTeams, dispatch, roomCode, currentQuestion, history])



    return (
        <React.Fragment>
            <h1>These teams have joined:</h1>

            {teams
                ? teams.map((team) => {
                      return <li key={team.name}>{team.name}</li>
                  })
                : null}
        </React.Fragment>
    )
}

export default WaitingRoom