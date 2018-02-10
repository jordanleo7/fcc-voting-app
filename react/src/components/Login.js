import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  render () {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <a href="http://localhost:5000/auth/google" className="btn btn-primary">
              Log in with Google
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
