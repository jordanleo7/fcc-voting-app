import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: ''
    };
  }

  componentDidMount() {
    axios.get('isLoggedIn')
    .then((response) => {
      console.log(response)
      this.setState({ isLoggedIn: response.data || 'Not logged in' })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {

    let loginButton = null;
    if (this.state.isLoggedIn.username) {
      loginButton = <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link to={"/newpoll"} className="nav-link">New Poll</Link></li>
          <li className="nav-item"><Link to={"/mypolls"} className="nav-link">My Polls</Link></li>
          <li className="nav-item"><Link to={"/auth/logout"} className="nav-link">Log out</Link></li>
        </ul>
      //<p>Logged in as {this.state.isLoggedIn.username}</p>;
      } else {
        loginButton = <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link to={"/auth/login"} className="nav-link">Log in</Link></li>
        </ul>
    }

    return (
      <div>
        {loginButton}
      </div>
    );
  }
}

class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">Make a Poll</Link>

          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbarItems">

              <LoginControl />

          </div>    
        </nav>
      </div>
    )

  }
}

export default Navbar
