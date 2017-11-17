import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    /**
     * Ao clicar no enter adiciona novo item
     */
    listen('change', '#todoInput', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
        document.getElementById('todoInput').focus();
    });

    /**
     * Ao alterar o filtro busco o opção selecionado e adiciono ou removo a classe display-none
     * para mostrar ou esconder o item comforme o filtro selecionado.
     */
    listen('change', '#filter_options', event => {        
        let option = event.target.value;
        let elementsDone = document.getElementsByClassName('todo__item todo__item--done');
        let elementsOpen = document.getElementsByClassName('todo__item todo__item--open');

        switch(option) {
            case "ALL" : {
                for(let i = 0; i < elementsDone.length; i++) {
                    elementsDone[i].classList.remove('display-none');
                }            
                for(let i = 0; i < elementsOpen.length; i++) {
                    elementsOpen[i].classList.remove('display-none');
                }
                break;
            }
            case "OPEN" : {
                for(let i = 0; i < elementsDone.length; i++) {
                    elementsDone[i].classList.add('display-none');
                }
                for(let i = 0; i < elementsOpen.length; i++) {
                    elementsOpen[i].classList.remove('display-none');
                }        
                break;
            }
            case "DONE": {
                for(let i = 0; i < elementsOpen.length; i++) {
                    elementsOpen[i].classList.add('display-none');
                }
                for(let i = 0; i < elementsDone.length; i++) {
                    elementsDone[i].classList.remove('display-none');
                }        
                break;
            }
        }
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
}
