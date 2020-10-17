import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startQuiz } from '../actions/quizActions'
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
                <h2>Roomcode: {this.props.roomCode}</h2>

                <p>Teams:</p>
                <ul>
                    {this.props.connectedTeams
                        ? this.props.connectedTeams.map((team) => {
                              return (
                                  <li key={team.name}>
                                    <span>{team.name} </span>
                                    {
                                        this.props.acceptedTeams.some(e => e.name === team.name)
                                        ? <span> - User accepted</span>
                                        : <React.Fragment>
                                            <button onClick={() => this.props.reviewTeam(team.name, 'accept')}>Accept</button>
                                            <button onClick={() => this.props.reviewTeam(team.name, 'remove')}>Deny</button>
                                          </React.Fragment> 
                                        }
                                  </li>
                                )
                          })
                        : null}
                </ul>

                <div>
                    
                    {this.props.acceptedTeams.length >= 1
                        ? <button onClick={() => this.props.startQuiz()}>Start Quiz</button>
                        : ''
                    }
                </div>
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
        startQuiz: () => dispatch(startQuiz()),
        reviewTeam: (...data) => dispatch(reviewTeam(...data)),
        getTeams: (data) => dispatch(getTeams(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsLobby)
