import React from 'react';

import {listen} from './../lib/events';

export default class Filter extends React.Component {    
    constructor(props) {
        super(props);          
    }
    
    render() {
    
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
        if(this.props.isShow) {
            return (
                <div>
                    <div className="row margin-top-10">
                        <div className="col-md-12">
                            <label>Filtro</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 margin-bottom-10">
                            <label className="radio-inline">
                                <input type="radio" name="filter_options" id="filter_options" value="ALL" defaultChecked={true} /> Mostrar todos
                            </label>  
                            <label className="radio-inline">
                                <input type="radio" name="filter_options" id="filter_options" value="OPEN" /> Somente abertos
                            </label>  
                            <label className="radio-inline">
                                <input type="radio" name="filter_options" id="filter_options" value="DONE" /> Somente fechados
                            </label>                        
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}