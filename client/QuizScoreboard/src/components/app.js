import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import JoinQuizCode from './joinQuizCode'
import WaitingRoom from './waitingRoom'
import Quiz from './Quiz'
import { webSocket } from '../actions/sessionActions'

export const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(webSocket())
    }, [dispatch])

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