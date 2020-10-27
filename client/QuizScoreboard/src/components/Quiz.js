import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams, getAnswer, getQuestions } from '../actions/quizActions'

export const Quiz = () => {
    const dispatch = useDispatch()
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion)
    const answers = useSelector((state) => state.quiz.answers)
    const fetchTeams = useSelector((state) => state.quiz.fetchTeams)
    const roomCode = useSelector((state) => state.quiz.roomCode)
    const fetchAnswers = useSelector((state) => state.quiz.fetchAnswers)
    const fetchQuestions = useSelector((state) => state.quiz.fetchQuestions)
    const roundNumber = useSelector((state) => state.quiz.roundNumber)

    useEffect(() => {
        if (fetchTeams === true) {
            dispatch(getTeams(roomCode))
        }
        
        if(fetchQuestions === true) {
            dispatch(getQuestions(roundNumber))
        }

        if (fetchAnswers === true) {
            dispatch(getAnswer())
        }
    })

    return (
        <div>
            <h1>{currentQuestion}</h1>


            { answers
                ? answers.map((a) => {
                      return (
                          <div>
                              <h3>{a.team}</h3>
                              {a.answer 
                                ? a.review === undefined 
                                    ? (<div>{a.team} : Has answered!</div>) 
                                    : (<div>{a.team} : heeft het {a.review ? ("YES") : ("NO")}</div>)
                                : <p>no answer yet..</p>
                              }
                          </div>
                      )
                  })
                : null
            }
        </div>
    )
}

export default Quiz
