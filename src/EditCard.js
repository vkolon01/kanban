import React,{Component} from 'react';
import {PropTypes} from 'prop-types';
import CardForm from './CardForm';

class EditCard extends Component{

  componentWillMount(){
    let card = this.props.cards.find((card) => card.id == this.props.data.params.card_id);
    console.log('this one ' , this.props.cards);
    this.setState({...card});
  }
  componentDidMount(){
    console.log('this one ' , this.props.cards);
  }
  handleChange(field,value){
    this.setState({[field]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.push('/');
  }

  handleClose(e){
    this.props.history.push('/');
  }

  render(){
    return(
      <CardForm draftCard={this.state}
      buttonLabel="Edit Card"
      handleClose={this.handleClose.bind(this)}
      handleSubmit={this.handleSubmit.bind(this)}
      handleChange={this.handleChange.bind(this)} />
    )
  }
}

EditCard.PropTypes = {
  cardCallbacks: PropTypes.object
};

export default EditCard;
