import React from 'react';
import propTypes from 'prop-types';
export class MessageListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.messageList = React.createRef();
  }

  render() {
    return (
      <div className="message-list-wrapper">
        <ul id="message-list" ref={this.messageList}>
          {this.props.messages.map((val, index) => (
            <li key={index} className="message">
              {val}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.messageList.current.children.length > 0) {
      const lastChild = this.messageList.current.lastChild;
      lastChild.scrollIntoView();
    }
  }
}

MessageListComponent.propTypes = {
  messages: propTypes.array,
};
MessageListComponent.defaultProps = {
  messages: [],
};

export default MessageListComponent;
