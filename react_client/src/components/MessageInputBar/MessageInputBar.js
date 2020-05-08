import React from 'react';
import propTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

class MessageInputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.sendClick = this.sendClick.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
    this.messageInput = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }
  render() {
    return (
      <div className="message-input-bar">
        <InputGroup>
          <FormControl
            placeholder="Message..."
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
            onKeyDown={this.inputKeyDown}
            ref={this.messageInput}
            name="message"
          />
          <InputGroup.Append>
            <Button onClick={this.sendClick}>Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
  componentDidMount() {
    this.focusInput();
  }
  focusInput() {
    this.messageInput.current.focus();
  }
  inputKeyDown(event) {
    if (event.key === 'Enter') {
      this.sendClick();
    }
  }
  sendClick() {
    if (!!this.state.value) {
      this.props.messageSend(this.state.value);
      this.setState({ value: '' });
    }
  }
}

MessageInputBar.propTypes = { messageSend: propTypes.func };
MessageInputBar.defaultProps = {
  messageSend: (msg) => {
    console.log('Sent');
    console.log(msg);
  },
};

export default MessageInputBar;
