import React from 'react';

import {isEnabled, getParamFilter, getParamRenderBottom, getParamFilterTop} from './../lib/feature';

import Title from './title.jsx';
import Filter from './filter.jsx';
import { todos } from './../state';
import ListTodo from './list-todo.jsx';

export default class App extends React.Component{    
    render() {        
        let data = todos.getState();        
        return(
            <div className="container">
                <Title />                
                <ListTodo {...data} />             
            </div>
        )
    }
}
