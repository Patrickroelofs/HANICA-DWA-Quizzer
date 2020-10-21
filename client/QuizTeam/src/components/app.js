import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import JoinQuizForm from './JoinQuizForm'
import WaitingRoom from './waitingRoom'
import Quiz from "./Quiz";

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() =>  <JoinQuizForm />} />
                <Route path={`/waitingroom`} render={() =>  <WaitingRoom />} />
                <Route path={'/quiz'} render={() => <Quiz/>} />
            </Switch>
        </Router>
    )
}

export default App