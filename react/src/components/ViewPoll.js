import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeletePoll from './DeletePoll';

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
      <div>
        <div>
          {JSON.stringify(this.state.poll)}
        </div>
        <DeletePoll pollId={this.state.pollId}/>
      </div>
    )
  }

}

export default ViewPoll;
