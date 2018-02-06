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
        <li key={poll + index} className="list-group-item">
          <Link to={"/viewpoll/" + poll._id}>
            {poll.title}
          </Link>
        </li>
      )
    });

    return (
      <div className="container-fluid pt-3 pb-3">
        <ul className="list-group">
          {pollList}
        </ul>
      </div>
    )
  }

}

export default AllPolls
