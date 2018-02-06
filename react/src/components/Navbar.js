import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <li className="nav-item"><Link to={"/auth/login"} className="nav-link">Sign in</Link></li>
              <li className="nav-item"><Link to={"/auth/logout"} className="nav-link">Sign out</Link></li>
            </ul>
          </div>

        </nav>
      </div>
    )

  }
}

export default Navbar
