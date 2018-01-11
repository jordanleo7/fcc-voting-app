import React, { Component } from 'react';
import axios from 'axios';
import DeletePoll from './DeletePoll';

class ViewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poll : [],
      pollId : this.props.match.params.id,
      voteId : ''
    };
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleChangeVote(event) {
    this.setState({voteId: event.target.value});
  }

  handleVote(event) {
    event.preventDefault();
    axios.put('/api/vote/' + this.state.pollId, {
      choice: this.state.voteId
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
    axios.get('/api/poll/' + this.state.pollId)
    .then((response) => {
      this.setState({poll: response.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {

    var pollTitle = this.state.poll.map((prop, index) => {
      return (
        <h3 key={'title'}>{prop.title}</h3>
      );
    })

    var pollOptions = this.state.poll.map((prop, index) => {
      var optionsSplit = prop.options.map((prop, index) => {
        return (
          <li key={'option' + index}>
            {prop.name}, votes: {prop.votes}
          </li>
        );
      })
      return (optionsSplit);
    })

    var pollOptionsVoting = this.state.poll.map((prop, index) => {
      var pollOptionsVotingSplit = prop.options.map((prop, index) => {
        return (
          <option key={'vote' + index} value={index}>{prop.name}
          </option>
        )
      })
      return (pollOptionsVotingSplit)
    })

    return (
      <div>
        {pollTitle}

        <form onSubmit={this.handleVote}>
          <select value={this.state.value} onChange={this.handleChangeVote}>
            <option key="choose">Vote here</option>
            {pollOptionsVoting}
            </select>
            <input type="submit" />
        </form>
        <h4>Results</h4>
        <ul>
          {pollOptions}
        </ul>
        <DeletePoll pollId={this.state.pollId} />
      </div>
    )
  }

}

export default ViewPoll;
