import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import JoinQuizCode from './joinQuizCode'
import WaitingRoom from './waitingRoom'
import Quiz from './Quiz'

class App extends Component {
    checkState() {
        if(this.props.roomCode === '' && this.props.quizStarted === false) {
            return <JoinQuizCode />

        } else if (this.props.roomCode !== '' && this.props.quizStarted === false) {
            return <WaitingRoom />

        } else if (this.props.roomCode !== '' && this.props.quizStarted === true) {
            return <Quiz />
            
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact render={() => this.checkState() } />
                    <Route path={`/waitingroom`} render={() => this.checkState() } />
                    <Route path={`/quiz`} render={() => this.checkState() } />

                    <Route render={() => <Redirect to="/" /> } />
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        quizStarted: state.quiz.quizStarted
    }
}

export default connect(mapStateToProps)(App)