import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from 'containers/App'
import './styles/layout.scss'
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore';

const MOUNT_NODE = document.getElementById('root')
const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
               <App />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE,
    );
}

render()