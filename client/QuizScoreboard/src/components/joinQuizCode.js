import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinQuiz } from './../actions/quizActions'

class JoinQuizCode extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.joinQuiz(e.target.roomCode.value)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="roomCode" ref="roomCode" />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinQuiz: (data) => dispatch(joinQuiz(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinQuizCode)