import React from 'react';
import { shallow } from 'enzyme';
import { MessageContainerComponent } from './MessageContainer';

describe('MessageContainer', () => {
  let messageContainer;
  let mockSendMessage;
  let storeProps;

  beforeEach(() => {
    mockSendMessage = jest.fn();
    storeProps = { messages: [], sendMessage: mockSendMessage };
    messageContainer = shallow(<MessageContainerComponent {...storeProps} />);
  });

  afterEach(() => {
    messageContainer.unmount();
  });

  it('should render component', () => {
    expect(messageContainer).toMatchSnapshot();
  });
  describe('class methods', () => {
    it('should emit the passed message when sendMessage is called', () => {
      const message = `Hello there`;
      messageContainer.instance().sendMessage(message);
      expect(mockSendMessage).toHaveBeenCalledWith(message);
    });
  });
});
