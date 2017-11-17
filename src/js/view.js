import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(                
        renderInput(),    
        renderFilter(),          
        renderTodos(todoItems)
    );
}

function renderApp(input, filter, todoList) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    } else if(isEnabled('filter')) {
        return renderAddTodoFilter(input, filter, todoList);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoFilter(input, filter, todoList) {
    return `<div id="app">
                ${input}                
                ${filter}
                ${todoList}
            </div>`;
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}        
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}       
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input">
                <input type="text" id="todoInput"><button id="addTodo">Add</button>
            </div>`;
}

function renderFilter() {
    return `<div class="todo__input">
                <input type="radio" name="filter_options" id="filter_options" value="ALL" checked="checked"> Mostrar todos
                <input type="radio" name="filter_options" id="filter_options" value="OPEN"> Somente abertos
                <input type="radio" name="filter_options" id="filter_options" value="DONE"> Somente fechados
            </div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}
