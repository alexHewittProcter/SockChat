import React from 'react';
import { mount } from 'enzyme';
import MessageInputBar from '../MessageInputBar';

describe('MessageInputBar', () => {
  let messageInputBar;
  let messageSend;
  let props;

  let getComp = (selector) => messageInputBar.find(selector);
  let getInput = () => getComp('input[name="message"]');
  let getValue = (component) => component.prop('value');
  it('should render correctly', () => {
    messageInputBar = mount(<MessageInputBar />);
    expect(messageInputBar).toMatchSnapshot();
  });
  beforeEach(() => {
    messageSend = jest.fn();
    props = { messageSend };
    messageInputBar = mount(<MessageInputBar {...props} />);
  });
  describe('Message input', () => {
    it('should allow a user to input text/numbers', () => {
      expect(getValue(getInput())).toEqual('');
      getInput().simulate('change', { target: { name: 'message', value: 'Test input' } });
      expect(getValue(getInput())).toEqual('Test input');
    });
    describe('passing the inputted message when pressing the Enter key', () => {
      it('should not call the function when the input is empty', () => {
        expect(getValue(getInput())).toEqual('');
        getInput().simulate('keydown', { key: 'Enter' });
        expect(messageSend).toHaveBeenCalledTimes(0);
      });
      it('should call the function when the input is not empty', () => {
        getInput().simulate('change', { target: { name: 'message', value: 'Test input' } });
        getInput().simulate('keydown', { key: 'Enter' });
        expect(messageSend).toHaveBeenCalledTimes(1);
        expect(messageSend).toHaveBeenCalledWith('Test input');
      });
    });
  });
});
