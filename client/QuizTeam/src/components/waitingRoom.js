import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

export const WaitingRoom = () => {
    const history = useHistory()
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    useEffect(() => {
        if(currentQuestion){
            history.push('/quiz')
        }
    }, [currentQuestion])
    return (
        <div>
            <h1>Waiting for QuizMaster</h1>
        </div>
    )
}

export default WaitingRoom