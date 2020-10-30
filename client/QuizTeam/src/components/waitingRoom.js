import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {getQuestions} from "../actions/quizActions";
import { translate } from '../functions/language'

export const WaitingRoom = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const fetchQuestions = useSelector(state => state.quiz.fetchQuestions)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const language = useSelector(state => state.quiz.language)
    
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
            <h1>{translate(language, 'waitingToStart')}</h1>
            {roundNumber
                ? <h4>{translate(language, 'round')} {roundNumber} {translate(language, 'making')}</h4>
             : null}
        </div>
    )
}

export default WaitingRoom