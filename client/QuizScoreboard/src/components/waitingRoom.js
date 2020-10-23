import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../actions/quizActions'
import { useHistory } from "react-router-dom";

import './css/normalize.scss'
import './css/app.scss'

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
        <div className='waitingRoom'>
            <div className='hero'>
            <div className='waveBG wave1'></div>
                <div className='waveBG wave2'></div>
                <div className='waveBG wave3'></div>
                <div className='waveBG wave4'></div>

                <h3>{roomCode}</h3>
                <h1>These teams have joined:</h1>
                <div className='container'>
                    <div className='teamList'>
                    {teams
                        ? teams.map((team) => {
                            return (
                                <div>
                                    <div>
                                        <img alt='' width="150px" src={`${process.env.PUBLIC_URL}/img/undraw_profile_pic_ic5t.svg`} />
                                    </div>
                                    <p key={team.name}>{team.name}</p>
                                </div>

                            )
                        })
                        : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WaitingRoom