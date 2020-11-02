import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTeams } from '../actions/quizActions';
import { translate } from '../functions/language';

export const EndResult = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const teams = useSelector((state) => state.quiz.teams)
    const sortedTeams = _.sortBy(teams, "roundPoints").reverse()

    const language = useSelector(state => state.quiz.language)
    const started = useSelector(state => state.quiz.started)

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    useEffect(() => {
        if(started === false) {
            history.push('/')}
        else{
            dispatch(getTeams(roomCode))
        }
    }, [dispatch, history, roomCode, started])

    
    return (
        <div>
            <div className="pie">
                <p className="p1"></p>
                <p className="p2"></p>
                <p className="p3"></p>
                <p className="p4"></p>
                <p className="p5"></p>
                <p className="p6"></p>
                <p className="p7"></p>
                <p className="p8"></p>
                <p className="p9"></p>
                <p className="p10"></p>
                <p className="p11"></p>
                <p className="p12"></p>
                <p className="p13"></p>
                <p className="p14"></p>
                <p className="p15"></p>
                <p className="p16"></p>
                <p className="p17"></p>
                <p className="p18"></p>
                <p className="p19"></p>
                <p className="p20"></p>
            </div>
            <div className='endresult'>
                <h1>{translate(language, 'endResult')}</h1>

                <div className='endresultlist'>
                    {sortedTeams
                        ? sortedTeams.map((team) => {
                            return (
                                <div key={team.name} className={`team ${sortedTeams[0].name === team.name ? 'winner' : ''} `}>
                                    <div>
                                        { sortedTeams[0].name === team.name
                                            ? <span className='emoji' role="img" aria-label="crown :)">👑</span>
                                            : <span className='emoji'>{ team.teamMoji }</span>
                                        }
                                    </div>
                                    <div>
                                        <h2 key={team.name}>{team.name}</h2>
                                        <span>{team.roundPoints} Round Points!</span>
                                    </div>
                                </div>
                            )
                        })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default EndResult
