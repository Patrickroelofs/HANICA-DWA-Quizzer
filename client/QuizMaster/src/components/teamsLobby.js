import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { startQuiz } from '../actions/quizActions'
import { reviewTeam, getTeams } from '../actions/teamActions'
import { translate } from '../functions/language'


export const TeamsLobby = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const roomCode = useSelector(state => state.quiz.roomCode)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const connectedTeams = useSelector(state => state.quiz.connectedTeams)
    const acceptedTeams = useSelector(state => state.quiz.acceptedTeams)
    const scoreboard = useSelector(state => state.quiz.scoreboard)
    const language = useSelector(state => state.quiz.language)

    useEffect(() => {

        if(fetchTeams === true) {
            dispatch(getTeams(roomCode))
        }
    }, [fetchTeams, dispatch, roomCode])

    const handleSubmit = () => {
        history.push("/categories")
    }

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='teamsLobby'>
            <h1>{translate(language, 'pin')} {roomCode}</h1>
            { connectedTeams.length >= 1
                ? <h2>{translate(language, 'teamsInRoom')}</h2>
                : <p>{translate(language, 'noTeamsFound')}</p>
            }

            <ul>
                {connectedTeams
                    ? connectedTeams.map((team) => {
                          return (
                              <li key={team._id}>
                                <span><span className='teamMoji'>{team.teamMoji}</span> {team.name}</span>
                                {
                                    acceptedTeams.some(e => e.name === team.name)
                                    ? <span> - {translate(language, 'userAccepted')}</span>
                                    : <React.Fragment>
                                        <button onClick={() => dispatch(reviewTeam(team.name, 'accept'))}>✔️</button>
                                        <button onClick={() => dispatch(reviewTeam(team.name, 'remove'))}>❌</button>
                                      </React.Fragment> 
                                    }
                              </li>
                            )
                      })
                    : null
                }
            </ul>   
            <div>
                  
                {acceptedTeams.length >= 1
                    ? <button className='button full' onClick={() => handleSubmit()}>Start Quiz</button>
                    : null
                }

                { scoreboard
                    ? <p>{translate(language, 'scoreboardJoined')}</p>
                    : <p>{translate(language, 'noScoreboardFound')}</p>
                }
            </div>
        </div>
    )
}

export default TeamsLobby