import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinQuiz } from '../actions/quizActions'

class JoinQuizForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.joinQuiz(e.target.roomCode.value, e.target.teamName.value)
    }


    render() {
        return (
            <div>
                <form method='post' onSubmit={this.handleSubmit}>
                    <input name='teamName' type='text' placeholder='team name...'/>
                    <input name='roomCode' type='text' placeholder='room code...'/>
                    <button type="submit" value="Submit" className='submitTeamButton'>Login & create websocket</button>
                </form>
                {this.props.accepted === false
                    ? <h3>Sorry you got rejected</h3>
                    : this.props.roomCode
                            ?<h3>Joined {this.props.roomCode}! waiting for review</h3>
                            :null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.quiz.roomCode,
        accepted: state.quiz.accepted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinQuiz: (roomCode, teamName) => dispatch(joinQuiz(roomCode, teamName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinQuizForm)