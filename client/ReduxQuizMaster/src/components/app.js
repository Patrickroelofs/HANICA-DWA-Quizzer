import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import CreateQuiz from './createQuiz'
import TeamsLobby from './teamsLobby'
import ChooseCategories from './chooseCategories'

class App extends Component {

    checkPath() {
        if(this.props.roomCode === '') {
            return <CreateQuiz />
        } else {
            return <Redirect to={'/lobby'} />
        }
    }

    checkLobby() {
        if(this.props.roomCode !== '' && this.props.startQuiz === false) {
            return <TeamsLobby />
        } else if(this.props.roomCode !== '' && this.props.startQuiz === true) {
            return <Redirect to={'/categories'} />
        } else {
            return <Redirect to={'/'} />
        }
    }

    checkChooseCategories() {
        if(this.props.roomCode !== '' && this.props.startQuiz === true) {
            return <ChooseCategories />
        } else {
            return <Redirect to={'/'} />
        }
    }

    render() {
        return (
            <Router>
                <Route path="/" exact render={() => this.checkPath()} />
                <Route path="/lobby" render={() => this.checkLobby()} />
                <Route path="/categories" render={() => this.checkChooseCategories()} />
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