import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'
import ChooseCategories from './chooseCategories'
import SendQuestions from './sendQuestions';
import Review from './Review'
import EndQuiz from './endQuiz'

import './css/normalize.scss'
import './css/app.scss'

export const App = () => {
    return (
        <div>
            <div className="blob">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.7,-74.9C58.2,-65.4,63.4,-48.4,68.1,-32.7C72.8,-17,76.9,-2.7,72.3,8.5C67.7,19.6,54.4,27.6,43.5,34.5C32.6,41.4,24.1,47.1,14.6,50.1C5.1,53.1,-5.3,53.4,-17.1,52.5C-28.9,51.7,-42.1,49.8,-49.6,42.3C-57,34.8,-58.8,21.8,-57.9,10C-56.9,-1.7,-53.3,-12.2,-47.7,-20.7C-42.1,-29.2,-34.6,-35.7,-26.3,-46.7C-18.1,-57.7,-9,-73.1,4.3,-79.8C17.6,-86.5,35.3,-84.5,46.7,-74.9Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact render={() => <CreateQuiz />} />
                        <Route path="/lobby" render={() => <TeamsLobby />} />
                        <Route path="/categories" render={() => <ChooseCategories />} />
                        <Route path='/sendquestions' render={() => <SendQuestions />} />
                        <Route path='/review' render={() => <Review />} />
                        <Route path='/endQuiz' render={() => <EndQuiz />} />
                    </Switch>
                </Router>
            </div>
        </div>

    )
}

export default App