import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AllPolls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axios.get('/api/allpolls')
    .then((response) => {
      this.setState({list: response.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {

    let pollList = this.state.list.map(function(poll, index){
      return (
        <Link to={"/viewpoll/" + poll._id} key={index}>
          {poll.title}
        </Link>
      )
    });

    return(
      <div>
        <h3>All Polls</h3>
        <div>
          {pollList}
        </div>
        <Link to={"newpoll"}>New Poll</Link>
      </div>
    )
  }

}








export default AllPolls
