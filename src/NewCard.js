import React,{Component} from 'react';
import {PropTypes} from 'prop-types';
import CardForm from './CardForm';

class NewCard extends Component{

  componentWillMount(){
    this.setState({
      id: Date.now(),
      title:'',
      description:'',
      status:'todo',
      color:'#c9c9c9',
      tasks:[]
    });
  }
  handleChange(field,value){
    this.setState({[field]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.push('/',null);
  }

  handleClose(e){
    this.props.history.push(null,'/');
  }

  render(){
    return(
      <CardForm draftCard={this.state}
        buttonLabel="Create Card"
        handleClose={this.handleClose.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleChange={this.handleChange.bind(this)} />
    )
  }
}

NewCard.PropTypes = {
  cardCallbacks: PropTypes.object
};

export default NewCard;
