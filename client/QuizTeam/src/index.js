import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import TeamApp from './Components/TeamApp'

ReactDOM.render(
    <Provider store={store}>
        <TeamApp />
    </Provider>,
    document.getElementById('root'));