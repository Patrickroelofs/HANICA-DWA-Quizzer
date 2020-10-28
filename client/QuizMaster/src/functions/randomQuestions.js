const _ = require('lodash');

export function randomQuestions(questions) {
    return (dispatch) => {
        let convertedQuestions = []

        for(var i in questions) {
            convertedQuestions.push(questions[i])
        }
    
        let newQuestions = _.sampleSize(convertedQuestions, 6)

        dispatch({type: 'RANDOM_QUESTIONS', payload: newQuestions}) 
    }

}