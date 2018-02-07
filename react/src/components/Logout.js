import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {

  render () {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
              <a href="http://localhost:5000/auth/logout" className="btn btn-primary">
              Log out
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout
