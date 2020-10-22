import React from 'react'
import {useSelector} from 'react-redux'



export const Quiz = () => {
    const currentQuestion = useSelector(state => state.quiz.currentQuestion)
    const roomCode = useSelector(state => state.quiz.roomCode)

    const handleSubmit = (e) => {
        e.preventDefault();
        // todo: make this work idk why it doesnt but im done
        //dispatch(sendAnswer(e.target.answer.value))

    }

    return (
        <div>
            <h6>{roomCode}</h6>
            <h1>{currentQuestion}</h1>
            <form method='post' onSubmit={handleSubmit}>
                <input name='answer' type='text' placeholder='put your answer here..'/>
                <button type="submit" value="Submit" className='submitAnswerButton'>Send Answer</button>
            </form>

        </div>
    )
}

export default Quiz