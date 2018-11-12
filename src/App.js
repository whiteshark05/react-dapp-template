import React, { Component } from 'react';
import logo from './logo.svg';
//import contract from './Contract Interface/contractInterface.js'
import './App.css';
import {UserInfo, ChatBox} from './Components'
import {getAccount} from './ContractInterface/contractInterface.js'

class App extends Component {
  constructor (){
    super();
    this.state = {account: null}
  }

  componentDidMount() {
    getAccount()
    .then(acc => this.setState({account:acc})) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className = "container">
          <UserInfo account = {this.state.account}/>
          <ChatBox account = {this.state.account}/> 
        </div>
      </div>
    );
  }
}

export default App;
