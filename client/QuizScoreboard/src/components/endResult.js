import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTeams } from '../actions/quizActions';
import { translate } from '../functions/language';

export const EndResult = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const answers = useSelector((state) => state.quiz.answers)
    const teams = useSelector((state) => state.quiz.teams)
    const language = useSelector(state => state.quiz.language)
    const started = useSelector(state => state.quiz.started)

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    useEffect(() => {
        dispatch(getTeams(roomCode))
        if(started === false) {
            history.push('/')
        }
    }, [dispatch, history, roomCode, started])


    
    return (
        <div className='endresult'>
            <h1>{translate(language, 'answers')}</h1>

            <div className='endresultlist'>
                {teams && answers
                    ? teams.map((team) => {
                        return answers.map((answer) => {
                            if(team.name.toString() === answer.team.toString()) {
                                return (
                                    <div key={team.name} className='team'>
                                        <h2 key={team.name}>{team.name}</h2>
                                        <p>{answer.answer}</p>
                                        <span>{team.roundPoints}</span>
                                    </div>
                                )
                            }
                        })

                      })
                    : null}
            </div>
        </div>
    )
}

export default EndResult
