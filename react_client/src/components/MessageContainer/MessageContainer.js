import React from 'react';
import MessageListComponent from '../MessageList/MessageList';
import MessageInputBar from '../MessageInputBar/MessageInputBar';
import './MessageContainer.css';
import { connect } from 'react-redux';
import { getMessages, SendMessageAction } from '../../store';

export class MessageContainerComponent extends React.Component {
  constructor(props) {
    super(props);
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
  sendMessage(message) {
    this.props.sendMessage(message);
  }
}

const mapStateToProps = (state) => {
  return {
    messages: getMessages(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  sendMessage: (msg) => {
    dispatch(SendMessageAction(msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainerComponent);
