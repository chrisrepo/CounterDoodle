import React, { Component } from 'react';
import Counter from './CounterPage/Counter';
import Login from './LoginPage/Login';
import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false,
    token: undefined,
  };

  setToken = (token) => {
    this.setState({
      token: token,
      isAuthenticated: true
    })
  }

  render() {
    if(this.state.isAuthenticated) {
      return <Counter authToken={this.state.token}/>
    } else {
      return <Login setToken={this.setToken}/>
    }
  }
}

export default App;
