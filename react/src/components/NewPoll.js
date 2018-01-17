import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../index.css';

class NewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      options: '',
      redirectToNewPage: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleOptionsChange(event) {
    this.setState({options: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/newpoll', {
      title: this.state.title,
      options: this.state.options
    })
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
        <Redirect to="/"/>
      )
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="newPollForm">
          <label htmlFor="title">Create a poll</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required />
          <label htmlFor="options">Options</label>
          <textarea name="options" value={this.state.options} onChange={this.handleOptionsChange} placeholder="Separate your options by new lines (return/enter)."></textarea>
          <input type="submit" value="Submit" />
        </form>

        <Link to={"/"}>Return to All Polls</Link>
      </div>
    )
  }

}

export default NewPoll;
