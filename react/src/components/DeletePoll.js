import React, { Component } from 'react';
import axios from 'axios';

class DeletePoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pollId: props.pollId
    };
    this.handleDeletePoll = this.handleDeletePoll.bind(this);
  }

  handleDeletePoll(event) {
    event.preventDefault();
    axios.delete('/api/deletepoll/' + this.state.pollId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleDeletePoll}>
        <input type="submit" value="Delete this poll" />
        </form>
      </div>
    )
  }

}

export default DeletePoll;
