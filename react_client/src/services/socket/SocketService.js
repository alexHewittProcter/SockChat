import io from 'socket.io-client';
import { NewMessageAction } from '../../store';

export class SocketService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  createClientConnection() {
    const clientConnection = io(':4000');
    clientConnection.on('connect', () => console.log('connected'));
    clientConnection.on('chat message', (msg) => this.dispatch(NewMessageAction(msg)));
    return clientConnection;
  }
}

export default SocketService;
