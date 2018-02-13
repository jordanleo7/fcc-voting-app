import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function UserGreeting(props) {
  return <p>Logged in as {props.isLoggedIn}</p>;
}

function GuestGreeting(props) {
  return <p>Logged out</p>;
}

function Greeting(props) {
  console.log(props.isLoggedIn)
  if (props.isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: ''
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: JSON.parse(localStorage.getItem('token')) || 'Not logged in' })
  }

  componentWillUnmount() {
    this.state.isLoggedIn
  }

  render() {
    console.log('nav', this.state.isLoggedIn)

    let loginButton = null;
    if (this.state.isLoggedIn.username) {
      loginButton = <p>Logged in as {this.state.isLoggedIn.username}</p>;
      } else {
      loginButton = <p>Logged out</p>;
    }

    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn.username} />
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link to={"/newpoll"} className="nav-link">New Poll</Link></li>
              <li className="nav-item"><Link to={"/mypolls"} className="nav-link">My Polls</Link></li>
              <li className="nav-item"><Link to={"/auth/login"} className="nav-link">Log in</Link></li>
              <li className="nav-item"><Link to={"/auth/logout"} className="nav-link">Log out</Link></li>
            </ul>
          </div>

            <LoginControl />
        </nav>
      </div>
    )

  }
}

export default Navbar
