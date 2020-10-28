import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import JoinQuizForm from './JoinQuizForm'
import WaitingRoom from './waitingRoom'
import Quiz from "./Quiz";
import Answered from './Answered'

import './css/normalize.scss'
import './css/app.scss'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() =>  <JoinQuizForm />} />
                <Route path={`/waitingroom`} render={() =>  <WaitingRoom />} />
                <Route path={'/quiz'} render={() => <Quiz/>} />
                <Route path={'/answered'} render={() => <Answered />} />
            </Switch>
        </Router>
    )
}

export default App