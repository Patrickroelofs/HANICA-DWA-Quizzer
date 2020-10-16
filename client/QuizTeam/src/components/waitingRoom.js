import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../actions/quizActions'


class WaitingRoom extends Component {

    componentDidMount() {
        this.props.getTeams(this.props.roomCode)
    }


    render() {
        console.log(this.props.teams)
        return (
            <div>
                <h1>Waiting for QuizMaster</h1>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        teams: state.quiz.teams,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTeams: (data) => dispatch(getTeams(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)