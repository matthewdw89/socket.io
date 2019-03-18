import React, { Component } from 'react'

export default class Message extends Component {


    
    render() {
        // Checking to see if the ids of primary user and the msg match
        const {me, author, message} = this.props
        const fromMe = me === author ? 'me' : 'them';
        return (
            <div className={`from__${fromMe}`}>
                <div className='message__body'>
                    <p>{message}</p>
                </div>
                <div className='message__details'>
                    <p>{author}</p>
                </div>
            </div>
        );
    }

}