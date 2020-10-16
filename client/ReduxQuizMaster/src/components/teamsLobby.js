import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../actions/quizActions'

class TeamsLobby extends Component {
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
            <div>
                <h1>Works!</h1>
                <h2>Roomcode: {this.props.roomCode}</h2>

                <p>Teams:</p>
                <ul>
                    {this.props.teams
                        ? this.props.teams.map((team) => {
                              return <li key={team.name}>{team.name}</li>
                          })
                        : null}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        fetchTeams: state.quiz.fetchTeams,
        teams: state.quiz.teams
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTeams: (data) => dispatch(getTeams(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsLobby)
