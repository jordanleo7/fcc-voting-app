import React, { Component } from 'react';

class Logout extends Component {
/*
  constructor(props) {
    super(props);
    this.state = {
      pollId: props.pollId,
      redirectToNewPage: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    location.href='http://localhost:5000/auth/logout';
    localStorage.clear();
  }

            <form onSubmit={this.handleLogout}>
              <button type="submit" className="btn btn-primary">Logout</button>
            </form>
*/

  render () {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <a href="/auth/logout" className="btn btn-primary">
              Log out
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout
