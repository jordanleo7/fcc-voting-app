import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poll : [],
      pollId : this.props.match.params.id
    };
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
    return (
      <div>{JSON.stringify(this.state.poll)}</div>
    )
  }

}

export default ViewPoll;
