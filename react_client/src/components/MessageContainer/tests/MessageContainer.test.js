import React from 'react';
import { shallow } from 'enzyme';
import io from 'socket.io-client';
import ConnectedMessageContainerComponent, { MessageContainerComponent } from '../MessageContainer';
jest.mock('socket.io-client');

describe('MessageContainer', () => {
  let messageContainer;
  let socketCallbacks;
  let mockEmitFn;
  let mockDisconnectFn;
  let mockOnFn;

  let mockAddMessage;
  let storeProps;

  beforeEach(() => {
    mockAddMessage = jest.fn();
    storeProps = { messages: [], addMessage: mockAddMessage };

    mockEmitFn = jest.fn();
    mockDisconnectFn = jest.fn();
    mockOnFn = jest.fn((location, callback) => socketCallbacks.push({ location, callback }));
    socketCallbacks = [];
    io.mockImplementation((_url) => {
      return { emit: mockEmitFn, on: mockOnFn, disconnect: mockDisconnectFn };
    });
    io.mockClear();

    messageContainer = shallow(<MessageContainerComponent {...storeProps} />);
  });

  afterEach(() => {
    messageContainer.unmount();
  });

  it('should render component', () => {
    expect(messageContainer).toMatchSnapshot();
    expect(io).toHaveBeenCalled();
  });

  describe('lifecycles', () => {
    describe('componentDidMount', () => {
      beforeEach(() => {
        messageContainer.instance().componentDidMount();
      });
      it('should init the socket client', () => {
        expect(io).toHaveBeenCalled();
      });
      it('should store the socket client in its state', () => {
        expect(messageContainer.state('client')).toEqual(io.mock.results[0].value);
      });
    });
    describe('componentWillUnmount', () => {
      beforeEach(() => {
        messageContainer.instance().componentWillUnmount();
      });
      it('should call the disconnect method on the socket client', () => {
        expect(mockDisconnectFn).toHaveBeenCalled();
        expect(mockDisconnectFn).toHaveBeenCalledTimes(1);
      });
      it('should unreference the socket client in its state', () => {
        expect(messageContainer.state('client')).toEqual(null);
      });
    });
  });
  describe('state changes', () => {
    it('should update messages when the `chat message` callback is called', () => {
      expect(mockAddMessage).toHaveBeenCalledTimes(0);
      socketCallbacks
        .filter((obj) => obj.location === 'chat message')
        .forEach((obj) => {
          obj.callback('General Kenobi');
        });
      expect(mockAddMessage).toHaveBeenCalledTimes(1);
      expect(mockAddMessage).toHaveBeenCalledWith('General Kenobi');
    });
  });
  describe('class methods', () => {
    it('should emit the passed message when sendMessage is called', () => {
      const message = `Hello there`;
      messageContainer.instance().sendMessage(message);
      expect(mockEmitFn).toHaveBeenCalledWith('chat message', message);
    });
  });
});
