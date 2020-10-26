import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomQuestions } from '../functions/randomQuestions'
import { useHistory } from 'react-router-dom'
import {sendReview} from "../actions/questionActions";
import {getTeams} from "../actions/teamActions";

export const Review = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const question = useSelector(state => state.questions.currentQuestions)
    const answer = useSelector(state => state.questions.answer)
    const fetchTeams = useSelector(state => state.quiz.fetchTeams)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const connectedTeams = useSelector(state => state.quiz.connectedTeams)


    const send = (review, teamName) => {
        //todo make this exist so that the review can be sent back
        dispatch(sendReview(review, teamName))
    }

    useEffect(() => {

        if(fetchTeams) {
            dispatch(getTeams(roomCode))
        }
    }, [answer, dispatch, fetchTeams, roomCode])
    return (
        <div>
            {question
                ? <React.Fragment>
                    <h1>{question.question}</h1>
                    <h3>{question.answer}</h3>
                </React.Fragment>
            : null}
            {connectedTeams
                ? connectedTeams.map(team => {return (
                    <div>
                    <h4>{team.name}</h4>
                        {team.answer ?
                            <div><p>{team.answer.givenAnswer}</p>
                                {team.answer.review === undefined
                                    ? <div>
                                        <button onClick={() => send(true, team.name)}>right</button>
                                        <button onClick={() => send(false, team.name)}>wrong</button>
                                      </div>
                                    : <p>{team.answer.review}</p>}
                                 </div>
                            : <p>waiting for answer</p>}
                    </div>)})
                :null}
                <button>Close Question</button>
        </div>
    )
}

export default Review