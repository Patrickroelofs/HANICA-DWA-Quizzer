import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from './../actions/questionActions'

class ChooseCategories extends Component {
    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div>
                <h1>Choose Categories!</h1>
                <p>Choose 3 Categories and 12 Questions</p>
                <div>
                    {this.props.categories
                        ? this.props.categories.map((category) => {
                            return <button key={category.toString()}>{category.toString()}</button>
                        })
                        : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.questions.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategories)
