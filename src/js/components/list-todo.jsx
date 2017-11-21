import React from 'react';
import Filter from './filter.jsx';
import Input from './input.jsx';
import {getParamFilter, getParamRenderBottom, getParamFilterTop} from './../lib/feature';

export default class App extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            todos: props.todos,
            filter: getParamFilter(),
            filterTop: getParamFilterTop(),
            renderBottom: getParamRenderBottom()
        };        
    }

    /**
     * Adiciona novo item na lista ao pressionar Enter
     * @param {*} event 
     */
    addEnter(event) {
        if(event.key == 'Enter'){
            let input = document.getElementById('todoInput').value;
            document.getElementById('todoInput').value = "";
            let data = this.props.todos;
            let id = (data.length + 1);        
            data.push( { id: id, text: input, done: false } );
            this.setState({todos: data});            
        }
    }

    /**
     * Adiciona novo item na lista ao clicar no botão
     * @param {*} event 
     */
    addTodos(event) {
        let input = document.getElementById('todoInput').value;
        document.getElementById('todoInput').value = "";
        let data = this.props.todos;
        let id = (data.length + 1);        
        data.push( { id: id, text: input, done: false } );
        this.setState({todos: data});        
    }

    /**
     * Ao clicar na item da lista irá setar status done ou false
     * @param {*} event 
     * @param {*} id 
     */
    setCheck(event, id) {
        const todos = [...this.state.todos];
        const todoIndex = todos.findIndex(function(val) {
            return val.id === id;
        });        
        todos[todoIndex].done = todos[todoIndex].done ? false : true;        
        this.setState({todos: todos});
    }

    /**
     * Retorna seguência para exibir os componentes e a lista
     */
    getCaseShowView() {      
        if((this.state.renderBottom == 'renderBottom') && 
           (this.state.filter == 'filter') && 
           (this.state.filterTop == undefined)) {            
            return "CASE1";            
        }

        if((this.state.renderBottom == 'renderBottom') && 
           (this.state.filter == undefined) && 
           (this.state.filterTop == undefined)) {         
            return "CASE2";
        }
        
        if((this.state.renderBottom == 'renderBottom') && 
           (this.state.filter == 'filter') && 
           (this.state.filterTop == undefined)) {         
         return "CASE3";
        }

        if((this.state.renderBottom == 'renderBottom') && 
           (this.state.filter == 'filter') && 
           (this.state.filterTop == 'filterTop')) {
            return "CASE3";
        }

        if((this.state.renderBottom == undefined) && 
        (this.state.filter == 'filter') && 
        (this.state.filterTop == undefined)) {         
         return "CASE4";
     }
     
        return "CASE0";
    }

    render() {                     
        let data = this.props.todos;
        const todosItems = (this.props.todos.map((item) => {
        const todoClass = `box-item todo__item todo__item--${item.done ? 'done task-done' : 'open'}`;
        const label = item.done ? 'fa fa-check-circle icon-done' : 'fa fa-dot-circle-o icon-tasks';
            return (
                <li className={todoClass} key={item.id} onClick={() => this.setCheck(event, item.id)} defaultChecked={item.done}>                   
                    <i className={label}></i>
                    <label>
                        <div className="checkbox item-list">                             
                            <input className="js_toggle_todo display-none" type="checkbox" onChange={() => this.setCheck(event, item.id)} defaultChecked={item.done}  />   
                            {item.text}                                 
                        </div>
                    </label>                    
                </li>
            );
        }));

        let positons = this.getCaseShowView();        

        return (
            <div>                                    
                { positons === "CASE0" ?
                    <div>
                        <Input addTodos={this.addTodos.bind(this)} addEnter={this.addEnter.bind(this)}/>  
                        <ul className="todo font-item margin-bottom-10">
                            {todosItems}
                        </ul>
                    </div> : positons == "CASE1" ?
                    <div>                        
                        <ul className="todo font-item margin-bottom-10">
                            {todosItems}
                        </ul>                           
                        <Input addTodos={this.addTodos.bind(this)} addEnter={this.addEnter.bind(this)}/>
                        <Filter isShow={this.state.filter} />                                                                       
                    </div> : positons == "CASE2" ?
                    <div>
                        <Input addTodos={this.addTodos.bind(this)} addEnter={this.addEnter.bind(this)}/>
                        <ul className="todo font-item margin-bottom-10">
                            {todosItems}
                        </ul>   
                    </div> : positons == "CASE3" ? 
                    <div>
                        <Filter isShow={this.state.filter} />                                               
                        <ul className="todo font-item margin-bottom-10">
                            {todosItems}
                        </ul> 
                        <Input addTodos={this.addTodos.bind(this)} addEnter={this.addEnter.bind(this)}/>  
                    </div> : positons == "CASE4" ? 
                    <div>
                        <Input addTodos={this.addTodos.bind(this)} addEnter={this.addEnter.bind(this)}/>  
                        <Filter isShow={this.state.filter} />                                               
                        <ul className="todo font-item margin-bottom-10">
                            {todosItems}
                        </ul>                         
                    </div> : ""
                }
            </div>
        );
    }
}
