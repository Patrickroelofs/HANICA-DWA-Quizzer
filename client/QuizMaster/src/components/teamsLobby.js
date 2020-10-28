import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { startQuiz } from '../actions/quizActions'
import { reviewTeam, getTeams } from '../actions/teamActions'


export const TeamsLobby = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const roomCode = useSelector(state => state.quiz.roomCode)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const connectedTeams = useSelector(state => state.quiz.connectedTeams)
    const acceptedTeams = useSelector(state => state.quiz.acceptedTeams)

    useEffect(() => {

        if(fetchTeams === true) {
            dispatch(getTeams(roomCode))
        }
    }, [fetchTeams, dispatch, roomCode])

    const handleSubmit = () => {
        history.push("/categories")
    }

    return (
        <div className='teamsLobby'>
            <h1>Game PIN: {roomCode}</h1>
            { connectedTeams.length >= 1
                ? <h2>Teams in kamer</h2>
                : null
            }

            <ul>
                {connectedTeams
                    ? connectedTeams.map((team) => {
                          return (
                              <li key={team._id}>
                                <span>{team.name} </span>
                                {
                                    acceptedTeams.some(e => e.name === team.name)
                                    ? <span> - User accepted</span>
                                    : <React.Fragment>
                                        <button onClick={() => dispatch(reviewTeam(team.name, 'accept'))}>Accept</button>
                                        <button onClick={() => dispatch(reviewTeam(team.name, 'remove'))}>Deny</button>
                                      </React.Fragment> 
                                    }
                              </li>
                            )
                      })
                    : null}
            </ul>   
            <div>
                  
                {acceptedTeams.length >= 1
                    ? <button className='button full' onClick={() => handleSubmit()}>Start Quiz</button>
                    : ''
                }
            </div>
        </div>
    )
}

export default TeamsLobby