import { store } from '../store'
const _ = require('lodash');

export function randomQuestions(questions) {
    return (dispatch) => {
        let convertedQuestions = []

        for(var i in questions) {
            convertedQuestions.push(questions[i])
        }

        let removedQuestionsHad = convertedQuestions.filter(question => !store.getState().questions.questionsHad.includes(question))

        let newQuestions = _.sampleSize(removedQuestionsHad, 6)

        dispatch({type: 'RANDOM_QUESTIONS', payload: newQuestions}) 
    }

}