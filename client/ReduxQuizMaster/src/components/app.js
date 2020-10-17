import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'
import ChooseCategories from './chooseCategories'

export const App = () => {
    return (
        <Router>
            <Route path="/" exact render={() => <CreateQuiz />} />
            <Route path="/lobby" render={() => <TeamsLobby />} />
            <Route path="/categories" render={() => <ChooseCategories />} />
        </Router>
    )
}

export default App