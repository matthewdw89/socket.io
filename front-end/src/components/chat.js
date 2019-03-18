import React, {Component} from 'react';
import ioClient from 'socket.io-client';
import Message from './message';

export default class Chat extends Component{
  constructor(){
    super()
    this.socket = ioClient.connect('http://localhost:8080');
    this.form = React.createRef();
  }

  state = {
    loggedIn: false,
    name: '',
    message: '',
    messageList: []
  }

  componentDidMount(){
    this.socket.emit('start');
    this.socket.on('receiveNewMessage', (data) => {
      this.setState({
        messageList: data
      })
      this.form.current.scrollIntoView({behavior: "smooth", block: "end"})
    })
  }

  submitName = (e) => {
    e.preventDefault();
    !e.target.commentInput
      ? this.setState({
          loggedIn: true
        })
      : this.socket.emit('sendNewMessage', {
          author: this.state.name,
          message: this.state.message
        },this.setState({
            message: ''
          })
        )
  }

  componentWillUnmount(){
    this.socket.emit('disconnect');
  }
  
  render() {
    return(
      <>
        <div className="chat__box">
          <h2>Chat board</h2>
          <div className="chat__messages">
            {
              this.state.messageList.map( (each,index) => {
                return <Message author={each.author} message={each.message} me={this.state.name} key={index}/>
              })
            }
          </div>
        </div>
        <form onSubmit={this.submitName} ref={this.form} className="chat__form">
          {
            !this.state.loggedIn
              ? <input type="text" placeholder="Name" name="nameInput" value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
              : <input type="text" placeholder="Comment" name="commentInput" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}}/>
          }

        </form>
      </>
    )
  }
}