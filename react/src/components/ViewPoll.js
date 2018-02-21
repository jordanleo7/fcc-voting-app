import React, { Component } from 'react';
import axios from 'axios';
import DeletePoll from './DeletePoll';
import Chart from './Chart';
import '../index.css';

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
      this.setState({poll: response.data, newPollOption: ''});
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
      <div className="container-fluid pb-5">

        <div className="row">

          <div className="col-sm-6">
            <Chart className="chart" chartData={this.state.poll} chartTitle={pollTitle} legendPosition="bottom" />
          </div>

          <div className="col-sm-6">
          <form onSubmit={this.handleVote} className="pt-3">
            <div className="text-left">
              <label htmlFor="voteOptions">Vote here</label>
              <div className="form-row">
                <div className="col-8 my-1">
                  <select className="form-control" id="voteOptions" value={this.state.value} onChange={this.handleChangeVote}>
                  <option key="choose">Choose an option</option>
                  {pollOptionsVoting}
                  </select>
                </div>
                <div className="col-4 my-1">
                  <button type="submit" className="btn btn-primary col-12">Vote</button>
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={this.handleSubmitNewPollOption} className="pt-3">
            <div className="text-left">
              <label htmlFor="name">Add option</label>
              <div className="form-row">
                <input type="text" name="name" className="form-control col-8 my-1" value={this.state.newPollOption} onChange={this.handleChangeNewPollOption} placeholder="Name" required />
                <div className="col-4 my-1">
                  <button type="submit" value="Submit" className="btn btn-primary col-12">Add</button>
                </div>
              </div>
              <small id="optionHelp" className="form-text text-muted">Must be logged in to add an option.</small>
            </div>
          </form>

          <a href={'https://twitter.com/intent/tweet?url=https://make-a-poll.herokuapp.com/viewpoll/' + this.state.pollId} className="btn btn-secondary mt-4 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> Share on Twitter</a>
      
          </div>
      
        </div>

      </div>
    )
  }

}

export default ViewPoll;
