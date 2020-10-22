import React from 'react'
import { useSelector } from "react-redux";

export const Quiz = () => {
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    return (
        <h1>{currentQuestion}</h1>
    )
}

export default Quiz