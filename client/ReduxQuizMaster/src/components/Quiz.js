import React, { Component } from 'react'
import { connect } from 'react-redux'

class Quiz extends Component {
    render() {
        return (
            <h1>Quiz!</h1>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)