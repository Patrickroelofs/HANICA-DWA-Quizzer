import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import JoinQuizCode from './joinQuizCode'
import WaitingRoom from './waitingRoom'

class App extends Component {
    isInAQuiz() {
        if(this.props.roomCode !== '') {
            return <Redirect to={`/waitingroom`}  />
        } else {
            return <JoinQuizCode />
        }
    }

    isNotInAQuiz() {
        if(this.props.roomCode === '') {
            return <Redirect to="/" />
        } else {
            return <WaitingRoom />
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact render={() => this.isInAQuiz() } />
                    <Route path={`/waitingroom`} render={() => this.isNotInAQuiz() } />

                    <Route render={() => <Redirect to="/" /> } />
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode
    }
}

export default connect(mapStateToProps)(App)