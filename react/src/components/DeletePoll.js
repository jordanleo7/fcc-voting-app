import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class DeletePoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pollId: props.pollId,
      redirectToNewPage: false
    };
    this.handleDeletePoll = this.handleDeletePoll.bind(this);
  }

  handleDeletePoll(event) {
    event.preventDefault();
    axios.delete('/api/deletepoll/' + this.state.pollId)
    .then((response) => {
      this.setState({ redirectToNewPage: true })
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    if (this.state.redirectToNewPage) {
      return (
        <Redirect to="/mypolls"/>
      )
    }

    return (
      <div>
        <form onSubmit={this.handleDeletePoll}>
          <button type="submit" className="btn btn-danger">Delete</button>
        </form>
      </div>
    )
  }

}

export default DeletePoll;
