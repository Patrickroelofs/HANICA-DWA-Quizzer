import React, { Component } from 'react'
import { connect } from 'react-redux'

class WaitingRoom extends Component {

    render() {
        return (
            <h1>Works!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)