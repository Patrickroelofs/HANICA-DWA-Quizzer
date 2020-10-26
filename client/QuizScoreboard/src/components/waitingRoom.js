import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getQuestions, getTeams} from '../actions/quizActions'
import { useHistory } from "react-router-dom";

import './css/normalize.scss'
import './css/app.scss'

export const WaitingRoom = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const roomCode = useSelector(state => state.quiz.roomCode)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const fetchQuestions = useSelector(state => state.quiz.fetchQuestions)
    const teams = useSelector(state => state.quiz.teams)
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        } else {
            dispatch(getTeams(roomCode))
        }
        if (fetchQuestions){
            dispatch(getQuestions(roundNumber))
            history.push('/quiz')
        }
    }, [fetchTeams, dispatch, roomCode, currentQuestion, history, fetchQuestions, roundNumber])



    return (
        <div className='waitingRoom'>
            <div className='hero'>
            <div className='waveBG wave1'/>
                <div className='waveBG wave2'/>
                <div className='waveBG wave3'/>
                <div className='waveBG wave4'/>

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