import {isEnabled, getParamFilter, getParamRenderBottom, getParamFilterTop} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(                
        getTitle(),
        renderInput(),    
        renderFilter(),          
        renderTodos(todoItems)
    );
}

function renderApp(title, input, filter, todoList) {    
    /**
     * Renderiza tela 1° Filtro 
     *                2° Lista de tarefas
     *                3° Input
     */        
    if((getParamRenderBottom() == 'renderBottom') && (getParamFilter() == 'filter')) {
        if(getParamFilterTop() == 'filterTop') {
            /**
             * Passa filtro para o top caso filtro filterTop estive na url
             */
            return renderAddTodoFilter(title, filter, todoList, input);
        } else {
            return renderAddTodoFilter(title, todoList, filter, input);
        }        
    }
    /**
     * Renderiza: 1° Input
     *            2° Lista de tarefas
     */
    if(getParamRenderBottom() == 'renderBottom') {
        return renderAddTodoAtBottom(title, input, todoList);
    }

    /**
     * Renderiza: 1° Input
     *            2° Filtro
     *            3° Lista de tarefas
     */
    if(getParamFilter() == 'filter') {
        return renderAddTodoFilter(title, input, filter, todoList);
    }

    /**
     * Se não encontrar nenhum filtro na URL renderiza: 1° Input, 2° Lista de tarefas
     */
    if(!getParamFilter() && !getParamRenderBottom()) {
        return renderAddTodoAtTop(title, input, todoList);
    }     
}

function renderAddTodoFilter(title, input, filter, todoList) {
    return `<div class="container" id="app">
                <div class="row">
                    <div class="col-md-12">    
                        ${title}
                        ${input}                
                        ${filter}
                        ${todoList}
                    </div>
                </div>
            </div>`;
}

function renderAddTodoAtTop(title, input, todoList) {
    return `<div class="container id="app">
                <div class="row">
                    <div class="col-md-12">
                        ${title}
                        ${input}        
                        ${todoList}
                    </div>
                </div>        
            </div>`;
}

function renderAddTodoAtBottom(title, input, todoList) {
    return `<div class="container id="app">
        <div class="row">
            <div class="col-md-12">
                ${title}
                ${todoList}       
                ${input}        
            </div>
        </div>        
    </div>`;
}

function renderInput() {
    return `<div class="todo__input">
                <div class="row">
                    <div class-"col-md-12">
                        <label class="label-input">Add new item</label>
                    </div>
                    <div class="col-md-10">
                        <input class="form-control" type="text" id="todoInput">    
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-success" id="addTodo">Add</button>
                    </div>
                </div>                                
            </div>`;
}

function renderFilter() {
    return `<div class="row filter">
                    <div col-md-12>
                        <label>Filtro</label>
                    </div>
                    <div class="col-md-12 margin-bottom-10">                        
                        <label class="radio-inline">
                            <input type="radio" name="filter_options" id="filter_options" value="ALL" checked="checked"> Mostrar todos
                        </label>    
                        <label class="radio-inline">
                            <input type="radio" name="filter_options" id="filter_options" value="OPEN"> Somente abertos
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="filter_options" id="filter_options" value="DONE"> Somente fechados
                        </label>                        
                    </div>
                </div>
                <hr>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo font-item">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function getTitle() {
    return `<div class="col-md-12">
                <h3>Simple List</h3>                
                <hr>
            </div>`;
}
