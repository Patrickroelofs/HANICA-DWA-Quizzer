import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../actions/quizActions'

class WaitingRoom extends Component {
    componentDidMount() {
        this.props.getTeams(this.props.roomCode)
    }

    componentDidUpdate() {
        if (this.props.fetchTeams === true) {
            this.props.getTeams(this.props.roomCode)
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>These teams have joined:</h1>

                {this.props.teams
                    ? this.props.teams.map((team) => {
                          return <li key={team.name}>{team.name}</li>
                      })
                    : null}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        teams: state.quiz.teams,
        fetchTeams: state.quiz.fetchTeams,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTeams: (data) => dispatch(getTeams(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
