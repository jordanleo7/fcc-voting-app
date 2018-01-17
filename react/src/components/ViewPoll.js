import React, { Component } from 'react';
import axios from 'axios';
import DeletePoll from './DeletePoll';
import Chart from './Chart';

class ViewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poll : [],
      pollId : this.props.match.params.id,
      voteId : '',
      newPollOption : ''
    };
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleChangeNewPollOption = this.handleChangeNewPollOption.bind(this);
    this.handleSubmitNewPollOption = this.handleSubmitNewPollOption.bind(this);
    this.handleUpdatePollState = this.handleUpdatePollState.bind(this);
  }

  handleChangeNewPollOption(event) {
    this.setState({newPollOption: event.target.value});
  }

  handleSubmitNewPollOption(event) {
    event.preventDefault();
    axios.put('/api/newpolloption/' + this.state.pollId, {
      newPollOption: this.state.newPollOption
    })
    .then((response) => {
      console.log(response);
      this.handleUpdatePollState()
    })
    .catch((error) => {
      console.log(error);
    })
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
      this.handleUpdatePollState()
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

  handleUpdatePollState() {
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
        prop.title
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

        <Chart chartData={this.state.poll} chartTitle={pollTitle} legendPosition="bottom"/>

        <form onSubmit={this.handleVote}>
          <select value={this.state.value} onChange={this.handleChangeVote}>
            <option key="choose">Vote here</option>
            {pollOptionsVoting}
            </select>
            <input type="submit" />
        </form>

        <form onSubmit={this.handleSubmitNewPollOption}>
          <label htmlFor="name">Add option</label>
          <input type="text" name="name" value={this.state.newPollOption} onChange={this.handleChangeNewPollOption} placeholder="Name" required />
          <input type="submit" value="Submit" />
        </form>

        <DeletePoll pollId={this.state.pollId} />
      </div>
    )
  }

}

export default ViewPoll;
