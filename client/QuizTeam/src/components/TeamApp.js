import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import JoinQuizForm from './JoinQuizForm'
import WaitingRoom from './waitingRoom'

class TeamApp extends Component {
    isInAQuiz() {
        if(this.props.accepted === true) {
            return <Redirect to={`/waitingroom`}  />
        } else {
            return <JoinQuizForm />
        }
    }

    isNotInAQuiz() {
        if(this.props.accepted === undefined) {
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
        roomCode: state.quiz.roomCode,
        accepted: state.quiz.accepted
    }
}

export default connect(mapStateToProps)(TeamApp)