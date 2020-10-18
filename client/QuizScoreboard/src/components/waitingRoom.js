import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../actions/quizActions'

export const WaitingRoom = () => {
    const dispatch = useDispatch()

    const roomCode = useSelector(state => state.quiz.roomCode)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const teams = useSelector(state => state.quiz.teams)



    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        } else {
            dispatch(getTeams(roomCode))
        }
    }, [fetchTeams, dispatch, roomCode])



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