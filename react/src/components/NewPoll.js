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
      <div className="container-fluid pt-3 text-left">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Poll title</label>
            <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="Enter title" required />
          </div>
          <div className="form-group">
            <label htmlFor="options">Poll options</label>
            <textarea name="options" className="form-control" value={this.state.options} onChange={this.handleOptionsChange} placeholder="Enter options" aria-describedby="optionsHelp"></textarea>
            <small id="optionsHelp" className="form-text text-muted"> Separate your options by new lines (return/enter).</small>
          </div>
          <button type="submit" className="btn btn-primary pl-4 pr-4">Submit</button>
          <Link to={"/"} className="btn btn-danger pl-4 pr-4 float-right">Cancel</Link>
        </form>


      </div>
    )
  }

}

export default NewPoll;
