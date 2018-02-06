import React, { Component } from 'react';

class Logout extends Component {
  render () {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <a href="http://localhost:5000/auth/github" className="btn btn-primary">
              Log out of GitHub (not functional)
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout
