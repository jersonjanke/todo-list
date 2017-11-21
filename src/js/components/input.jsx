import React from 'react';

export default class Input extends React.Component {
    render() {
        return(
            <div>
                <div className="todo__input margin-top-10">
                    <div className="row">
                        <div className="col-md-12">
                            <label>Adicionar</label>
                        </div>
                    </div>
                </div>     
                <div className="row">
                    <div className="col-xs-12 centered">
                        <input className="form-control" type="text" id="todoInput" onKeyPress={this.props.addEnter} />                            
                    </div> 
                    <div className="col-xs-12 margin-top-10">
                        <button className="btn btn-success btn-block" id="addTodo" onClick={this.props.addTodos}>Adicionar</button>
                    </div>
                </div>  
            </div>
        );
    }
}