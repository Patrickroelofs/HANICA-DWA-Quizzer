/* eslint-disable jsx-a11y/accessible-emoji */

import React, {useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'
import { translate } from '../functions/language'


export const JoinQuizForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const language = useSelector(state => state.quiz.language)
    const accepted = useSelector(state => state.quiz.accepted)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const started = useSelector(state => state.quiz.started)
    const message = useSelector(state => state.quiz.message)
    const teamMoji = useSelector(state => state.quiz.teamMoji)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(joinQuiz(e.target.roomCode.value, e.target.teamName.value, e.target.teamMoji.value))
        if(accepted) {
            history.push('/waitingroom')
        }
    }
    useEffect(() => {
        if(started === false){
            dispatch({type: 'DISCONNECTED_MASTER_LEFT'})
        }
        if(accepted && started === undefined){
            history.push('/waitingroom')
        }
    }, [accepted, dispatch, history, started])

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }
    
    return (
        <div className='joinQuizForm'>
            <span class='teamMoji'>{teamMoji}</span>
            <h1>QuizzerTeam</h1>
            {roomCode === '' || accepted === false
                ?   <form method='post' onSubmit={handleSubmit}>
                        <input className='input' name='teamName' type='text' placeholder='team name...'/> <br />
                        <select className='selectTeamMoji' name='teamMoji' placeholder='TeamMoji'>
                            <option value="random" style={{display: 'none'}}>TeamMoji</option>
                            <option value="😀">😀</option>
                            <option value="🥳">🥳</option>
                            <option value="😤">😤</option>
                            <option value="😰">😰</option>
                            <option value="😦">😦</option>
                            <option value="🤔">🤔</option>
                            <option value="🤯">🤯</option>
                        </select><br />
                        <input className='input second' name='roomCode' type='text' placeholder='room code...'/> <br />
                        <button className='button' type="submit" value="Submit">{translate(language, 'loginWithTeam')}</button>
                    {accepted === false ? <p>{message}</p> : null}
                    </form>

                : accepted === undefined
                    ? <p>{translate(language, 'waitingForReview')} {roomCode}</p>
                    : null
            }
            {}
        </div>
    )
}

export default JoinQuizForm