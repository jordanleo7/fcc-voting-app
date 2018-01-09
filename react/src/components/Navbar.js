import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <h1>Make a Poll</h1>
        <Link to={"/"}>Home</Link>
        <span> | </span>
        <Link to={"/newpoll"}>New</Link>
      </div>
    )

  }
}

export default Navbar
