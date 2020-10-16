import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reviewTeam, getTeams } from '../actions/teamActions'

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
                    {this.props.connectedTeams
                        ? this.props.connectedTeams.map((team) => {
                              return (
                                  <li key={team.name}>
                                    <span>{team.name}</span>
                                    <button onClick={() => this.props.reviewTeam(team.name, this.props.roomCode, 'accept')}>Accept</button>
                                    <button onClick={() => this.props.reviewTeam(team.name, this.props.roomCode, 'remove')}>Deny</button>
                                  </li>
                                )
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
        
        connectedTeams: state.quiz.connectedTeams,
        acceptedTeams: state.quiz.acceptedTeams
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reviewTeam: (...data) => dispatch(reviewTeam(...data)),
        getTeams: (data) => dispatch(getTeams(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsLobby)
