import io from 'socket.io-client';
jest.mock('socket.io-client');

describe('SocketService', () => {
  let socketCallbacks;
  let mockEmitFn;
  let mockDisconnectFn;
  let mockOnFn;

  beforeEach(() => {
    mockEmitFn = jest.fn();
    mockDisconnectFn = jest.fn();
    mockOnFn = jest.fn((location, callback) => socketCallbacks.push({ location, callback }));
    socketCallbacks = [];
    io.mockImplementation((_url) => {
      return { emit: mockEmitFn, on: mockOnFn, disconnect: mockDisconnectFn };
    });
    io.mockClear();
  });

  it('should create and return a Socket.I.O client when createClientConnection is called', () => {});
});
