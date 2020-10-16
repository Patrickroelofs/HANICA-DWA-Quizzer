import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuiz } from '../actions/quizActions'

class CreateQuiz extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createQuiz(e.target.language.value)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select name="language">
                        <option value="NL">Nederlands</option>
                        <option value="EN">English</option>
                    </select>
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
        createQuiz: (data) => dispatch(createQuiz(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)