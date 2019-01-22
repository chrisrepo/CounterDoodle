import React, { Component } from 'react';
import './Login.css';
import {API_LOCATION} from '../constants.js';

class Login extends Component {
  state = {
    error: undefined
  };

  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.signInAsync(username, password)
  }

  signInAsync = async (user, pass) => {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user, password: pass})
    }
    const response = await fetch(API_LOCATION +'/auth/login', config);
    const body = await response.json();

    if (response.status !== 200) {
      this.setState({
        error: body
      })
    } else {
      if(body.token) {
        this.props.setToken(body.token);
      }
    }
    return body;
  };

  render() {
    return  <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <p>Username: test Password: test</p>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
        {this.state.error && <div>{this.state.error}</div>}
      </form>
  }
}

export default Login;
