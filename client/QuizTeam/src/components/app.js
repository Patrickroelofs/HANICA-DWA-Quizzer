import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import JoinQuizForm from './JoinQuizForm'
import WaitingRoom from './waitingRoom'
import Quiz from "./Quiz";
import Answered from './Answered'

import './css/normalize.scss'
import './css/app.scss'
import { useSelector } from 'react-redux';

export const App = () => {

    const refresh = useSelector(state => state.quiz.refresh)

    useEffect(() => {
        if(refresh) {
            window.location.reload();
        }
    })

    return (
        <div>
            <div className="blob">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.7,-34.7C33.8,-23.8,41.2,-16.2,49.8,-3.4C58.5,9.4,68.5,27.3,64.9,41.2C61.4,55.1,44.3,64.8,26.1,71.2C8,77.6,-11.2,80.5,-26.2,74.2C-41.2,67.8,-52,52,-53.7,36.9C-55.3,21.8,-47.8,7.4,-45.4,-8.3C-42.9,-23.9,-45.5,-40.6,-38.8,-51.7C-32.1,-62.8,-16,-68.2,-3.6,-63.9C8.8,-59.6,17.6,-45.5,25.7,-34.7Z" transform="translate(100 100)" />
                </svg>        
            </div>
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact render={() =>  <JoinQuizForm />} />
                        <Route path={`/waitingroom`} render={() =>  <WaitingRoom />} />
                        <Route path={'/quiz'} render={() => <Quiz/>} />
                        <Route path={'/answered'} render={() => <Answered />} />
                    </Switch>
                </Router>
            </div>
        </div>

    )
}

export default App