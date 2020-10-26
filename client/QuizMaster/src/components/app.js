import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'
import ChooseCategories from './chooseCategories'
import SendQuestions from './sendQuestions';
import Review from './Review'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() => <CreateQuiz />} />
                <Route path="/lobby" render={() => <TeamsLobby />} />
                <Route path="/categories" render={() => <ChooseCategories />} />
                <Route path='/sendquestions' render={() => <SendQuestions />} />
                <Route path='/review' render={() => <Review />} />
            </Switch>
        </Router>
    )
}

export default App