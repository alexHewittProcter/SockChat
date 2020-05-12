import { takeEvery } from 'redux-saga/effects';
import { SendMessage } from '../actions';

export function* sendMessageSaga(params, action) {
  const { socket } = params;
  socket.emit('chat message', action.message);
}

export function* rootMessageSaga(params) {
  yield takeEvery(SendMessage, sendMessageSaga, params);
}
