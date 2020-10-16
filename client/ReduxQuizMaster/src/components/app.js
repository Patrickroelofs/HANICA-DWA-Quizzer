import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'
import Quiz from './Quiz'

class App extends Component {

    checkState() {
        if(this.props.roomCode !== '' && this.props.startQuiz === true) {
            return <Quiz />
        } else {
            if(this.props.roomCode !== '') {
                return <TeamsLobby />
            } else {
                return <CreateQuiz />
            }
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
        startQuiz: state.quiz.startQuiz,
    }
}

export default connect(mapStateToProps)(App)