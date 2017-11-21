import React from 'react';
import ReactDOM from 'react-dom';
import '../css/main.scss';
import {todos} from './state';
import App from './components/app.jsx';

ReactDOM.render(
    <App {...todos.getState()}/>,
    document.getElementById("app")
);
