import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
  }

  handleLoginGoogle(event) {
    event.preventDefault();
    axios.get('/auth/google')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

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
