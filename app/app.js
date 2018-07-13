import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import './styles/layout.scss'


const MOUNT_NODE = document.getElementById('root')

const render = () => {
    ReactDOM.render(
        <App />,
        MOUNT_NODE,
    );
}

render()