import React from 'react';
import io from 'socket.io-client';
import MessageListComponent from '../MessageList/MessageList';
import MessageInputBar from '../MessageInputBar/MessageInputBar';
import './MessageContainer.css';
import { connect } from 'react-redux';
import { getMessages, NewMessageAction } from '../../store';

export class MessageContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null };
    this.sendMessage = this.sendMessage.bind(this);
  }
  render() {
    const { messages } = this.props;
    return (
      <div className="message-container">
        <MessageListComponent messages={messages} />
        <MessageInputBar messageSend={this.sendMessage} />
      </div>
    );
  }
  componentDidMount() {
    if (!this.state.client) {
      const sockClient = io('http://localhost:4000');
      sockClient.on('connect', () => console.log('connected'));
      sockClient.on('chat message', (msg) => {
        this.props.addMessage(msg);
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

const mapStateToProps = (state) => {
  return {
    messages: getMessages(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addMessage: (msg) => {
    dispatch(NewMessageAction(msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainerComponent);
