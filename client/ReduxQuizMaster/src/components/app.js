import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'

class App extends Component {

    checkState() {
        if(this.props.roomCode !== '') {
            return <TeamsLobby />
        } else {
            return <CreateQuiz />
        }
    }

    render() {
        return (
            <Router>
                <Route path="/" exact render={() => this.checkState()} />
                <Route path="/lobby" render={() => this.checkState()} />
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        language: state.quiz.language,
    }
}

export default connect(mapStateToProps)(App)