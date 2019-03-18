import React, { Component } from 'react';
import Chat from './components/chat'
import socketLogo from './socket-io.svg'
import './styles/App.css';


export default class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SOCKET.IO</h1>
          <div>
            <img src={socketLogo} className="socket-logo" alt="socket logo" />
          </div>
        </header>
        <main>
          {/* CHAT COMPONENT TO GO HERE */}
          <Chat />
        </main>
      </div>
    );
  }
}