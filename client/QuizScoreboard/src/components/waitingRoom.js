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

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }


    return (
        <div className='waitingRoom'>
                <h3>Game PIN : {roomCode}</h3>
                <h1>These teams have joined</h1>
                
                <div className='teamList'>
                {teams
                    ? teams.map((team) => {
                        return (
                            <div key={team.name} className='team'>
                                <p>{team.name}</p>
                            </div>
                        )
                    })
                    : null}
                </div>
        </div>
    )
}

export default WaitingRoom