import io from 'socket.io-client';
import SocketService from './SocketService';
import { NewMessageAction } from '../../store';
jest.mock('socket.io-client');

describe('SocketService', () => {
  let socketCallbacks;
  let mockEmitFn;
  let mockDisconnectFn;
  let mockOnFn;

  let dispatchSpy;
  let socketService;

  beforeEach(() => {
    mockEmitFn = jest.fn();
    mockDisconnectFn = jest.fn();
    mockOnFn = jest.fn((location, callback) => socketCallbacks.push({ location, callback }));
    socketCallbacks = [];
    io.mockImplementation((_url) => {
      return { emit: mockEmitFn, on: mockOnFn, disconnect: mockDisconnectFn };
    });
    io.mockClear();

    dispatchSpy = jest.fn();
    socketService = new SocketService(dispatchSpy);
  });
  describe('createClientConnection method', () => {
    let socket;
    beforeEach(() => {
      socket = socketService.createClientConnection();
    });
    it('should create and return a Socket.I.O client when createClientConnection is called', () => {
      expect(socket).toBeDefined();
      expect(io).toHaveBeenCalled();
    });
    it('should create a client socket that listens for `chat message` messages', () => {
      const listeners = socketCallbacks.filter((caller) => caller.location === 'chat message');
      expect(listeners.length).toEqual(1);
      expect(listeners[0]).toBeDefined();
    });
    it('should dispatch a NewMessage action when a `chat message` is received', () => {
      const message = 'Hello there';
      const listeners = socketCallbacks.filter((caller) => caller.location === 'chat message');
      listeners.forEach((caller) => caller.callback(message));
      expect(dispatchSpy).toHaveBeenCalledWith(NewMessageAction(message));
    });
  });
});
