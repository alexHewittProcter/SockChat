import React from 'react';
import io from 'socket.io-client';
import MessageListComponent from '../MessageList/MessageList';
import MessageInputBar from '../MessageInputBar/MessageInputBar';
import './MessageContainer.css';

export class MessageContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], client: null };
    this.sendMessage = this.sendMessage.bind(this);
  }
  render() {
    return (
      <div className="message-container">
        <MessageListComponent messages={this.state.messages} />
        <MessageInputBar messageSend={this.sendMessage} />
      </div>
    );
  }
  componentDidMount() {
    if (!this.state.client) {
      const sockClient = io('http://192.168.0.36:4000');
      sockClient.on('connect', () => console.log('connected'));
      sockClient.on('chat message', (msg) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, msg],
        }));
      });
      this.setState({ client: sockClient });
    }
  }
  componentWillUnmount() {
    this.setState((prevState) => {
      if (prevState.client) prevState.client.disconnect();
      return { client: null };
    });
  }
  sendMessage(message) {
    if (this.state.client) this.state.client.emit('chat message', message);
  }
}

export default MessageContainerComponent;
