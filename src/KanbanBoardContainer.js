import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import 'babel-polyfill';
import {Route} from 'react-router-dom';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Athorization': 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
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
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let newTask = {id:Date.now(),name: taskName,done:false};

        let nextState = update(this.state.cards,{
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        let prevState = this.state;
        this.setState({cards:nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`,{
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('Response was not OK');
                }
            })
            .then((responseData) => {
                newTask.id = responseData.id;
                this.setState({cards:nextState})
            })
            .catch((error) => {
                this.setState(prevState);
            })

    }
    deleteTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });
        let prevState = this.state;

        this.setState({cards:nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method: 'delete',
            headers: API_HEADERS
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Response was not OK');
                }
            })
            .catch((Error) => {
                console.log('Fetch error ', Error);
                this.setState(prevState);
            })
    }
    toggleTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newDoneValue;
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done: {$apply:(done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });
        let prevState = this.state;
        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method: 'put',
            headers:API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Response was not OK');
                }
            })
            .catch((Error) => {
                console.log('Response was not OK');
                this.setState(prevState);
            });
    }
    updateCardStatus(cardId, listId){
        let cardIndex = this.state.cards.findIndex((card) => cardId === card.id);
        let card = this.state.cards[cardIndex];
        if(card.status !== listId){
            this.setState(update(this.state,{
                cards:{
                    [cardIndex]:{
                        status:{$set: listId}
                    }
                }
            }))
        }
    }
    updateCardPosition(cardId, afterId){
        if(cardId !== afterId){
            let cardIndex = this.state.cards.findIndex((card) => cardId === card.id);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card) => afterId === card.id);
            this.setState(update(this.state,{
                cards:{
                    $splice:[
                        [cardIndex,1],
                        [afterIndex,0,card]
                    ]
                }
            }));
        }
    }
    persistCardDrag(cardId, status){
      let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
      let card = this.state.cards[cardIndex];
      fetch(`${API_URL}/cards/${cardId}`,{
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify({status:card.status,row_order_position: cardIndex})
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error)=>{
        console.error("Fetch error:",error);
        this.setState(
          update(this.state,{
            cards:{
              [cardIndex]:{
                status:{$set:status}
              }
            }
          })
        );
      });
    }

    addCard(card){
      //Keep a reference to the original state
      let prevState = this.state;

      //Add a temporary ID to the card
      if(card.id===null){
        let card = Object.assign({},card,{id:Date.now()});
      }

      //Create a new object and push the new card to the array of cards
      let nextState = update(this.state.cards,{$push:[card]});

      //Set the component state to the mutated object
      this.setState({cards:nextState});
      //Call the API to add the card on the Server
      fetch(`${API_URL}/cards`,{
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(card)
      })
      .then((response)=>{
        console.log(response)
        if(response.ok){
          return response.json();
        }else{
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData)=>{
        //When the server returns the definitive ID used for the new Card on the server, update it on React
        card.id = responseData.id
        this.setState({cards:nextState})
      })
      .catch((error)=>{
        this.setState({cards:prevState});
      })
    }

    updateCard(card){
      //Keep a reference to the original state
      let prevState = this.state;

      //Find the index of the card
      let cardIndex = this.state.cards.find((c)=> c.id == card.id);

      let nextState = update(
        this.state.cards,{
          [cardIndex]:{$set:card}
        }
      );
      //Set the component state to the mutated object
      this.setState({cards:nextState});
      console.log(card);
      //Call the API to add the card on the Server
      fetch(`${API_URL}/cards`,{
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(card)
      })
      .then((response)=>{
        if(response.ok){
          return response.json();
        }else{
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData)=>{
        //When the server returns the definitive ID used for the new Card on the server, update it on React
        card.id = responseData.id
        this.setState({cards:nextState})
      })
      .catch((error)=>{
        console.log("Fetch error: ",error);
        this.setState({cards:prevState});
      })
    }
    render(){
    const kanbanBoard = () => (
      <KanbanBoard
        cards={ this.state.cards }
        taskCallbacks={{
        add: this.addTask.bind(this),
        delete: this.deleteTask.bind(this),
        toggle: this.toggleTask.bind(this)
      }}
        cardCallbacks={{
        addCard: this.addCard.bind(this),
        updateCard: this.updateCard.bind(this),
        updateStatus: this.updateCardStatus.bind(this),
        updatePosition: this.updateCardPosition.bind(this),
        persistCardDrag: this.persistCardDrag.bind(this)
      }}
      history={this.props.history} />
    )
      /*
      let kanbanBoard = this.props.children && React.cloneElement(this.props.children,{
        cards: this.state.cards,
        taskCallbacks:{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        },
        cardCallbacks:{
         addCard: this.addCard.bind(this),
         updateCard: this.updateCard.bind(this),
         updateStatus: this.updateCardStatus.bind(this),
         updatePosition: this.updateCardPosition.bind(this),
         persistCardDrag: this.persistCardDrag.bind(this)
        }
      });
      return kanbanBoard;
      */
        return <Route path='/' render={kanbanBoard}/>

    }
}

export default KanbanBoardContainer;
