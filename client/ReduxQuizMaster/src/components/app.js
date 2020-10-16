import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateQuiz from './createQuiz'


class App extends Component {

    render() {
        return (
            <Router>
                <Route path="/" exact render={() => <CreateQuiz />}></Route>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(App)