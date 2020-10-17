import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, selectCategory, unselectCategory } from './../actions/categoryActions'

class ChooseCategories extends Component {
    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div>
                <h1>Choose Categories!</h1>
                
                {this.props.selectedCategories.length >= 3
                    ? null
                    : <div>
                        <p>Choose {`${this.props.selectedCategories.length} / 3`} Categories</p>
                        {this.props.AllCategories
                        ? this.props.AllCategories.map((category) => {
                            return this.props.selectedCategories.includes(category)
                                ? null
                                : <button onClick={() => this.props.selectCategory(category.toString())} key={category.toString()}>{category.toString()}</button>
                          })
                        : null
                    }
                </div>
                }


                <p>Chosen Categories:</p>
                <div>
                    {
                        this.props.selectedCategories
                        ? this.props.selectedCategories.map((category) => {
                            return <button onClick={() => this.props.unselectCategory(category.toString())} key={category.toString()}>{category.toString()}</button>
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
        AllCategories: state.categories.all,
        selectedCategories: state.categories.selected
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        selectCategory: (category) => dispatch(selectCategory(category)),
        unselectCategory: (category) => dispatch(unselectCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategories)
