import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import JoinQuizCode from './joinQuizCode'
import WaitingRoom from './waitingRoom'
import Quiz from './Quiz'

import './css/normalize.scss'
import './css/app.scss'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() => <JoinQuizCode />} />
                <Route path={`/waitingroom`}  render={() => <WaitingRoom />} />
                <Route path={`/quiz`} render={() => <Quiz />} />
            </Switch>
        </Router>
    )
}

export default App