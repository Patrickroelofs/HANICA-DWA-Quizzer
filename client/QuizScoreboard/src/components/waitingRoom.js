import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../actions/quizActions'
import {useHistory} from "react-router-dom";
import { webSocket } from '../actions/sessionActions'

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
    }, [fetchTeams, dispatch, roomCode, currentQuestion])



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