import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {getQuestions} from "../actions/quizActions";

export const WaitingRoom = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const fetchQuestions = useSelector(state => state.quiz.fetchQuestions)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const roomCode = useSelector(state => state.quiz.roomCode)
    
    useEffect(() => {
        if(fetchQuestions){
            dispatch(getQuestions(roundNumber))
            history.push('/quiz')
        }
    }, [dispatch, fetchQuestions, history, roundNumber])

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='waitingRoom'>
            <h1>Waiting for QuizMaster to start.</h1>
            {roundNumber
                ? <h4>Round {roundNumber} in the making</h4>
             : null}
        </div>
    )
}

export default WaitingRoom