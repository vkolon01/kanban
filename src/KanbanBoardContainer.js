import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Athorization': 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            cards : []
        };
    }
    componentDidMount(){
        fetch(API_URL+'/cards',{headers:API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            })
    }

    addTask(cardId, taskName){
        console.log('task attempts to add')
    }
    deleteTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });

        this.setState({cards:nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method: 'delete',
            headers: API_HEADERS
        })
    }
    toggleTask(cardId, taskId, taskIndex){
        console.log('toggled');
    }

    render(){
        return <KanbanBoard cards={ this.state.cards }
                            taskCallbacks={{
                                add: this.addTask.bind(this),
                                delete: this.deleteTask.bind(this),
                                toggle: this.toggleTask.bind(this)
                            }}/>
    }
}

export default KanbanBoardContainer;