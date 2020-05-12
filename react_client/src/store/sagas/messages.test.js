import { rootMessageSaga, sendMessageSaga } from './messages';
import { takeEvery } from 'redux-saga/effects';
import { SendMessage } from '../actions';

describe('messages sagas', () => {
  describe('rootMessageSaga', () => {
    it('should yield a watched for SendMessage', () => {
      const params = {};
      const rootSaga = rootMessageSaga(params);
      expect(rootSaga.next().value).toEqual(takeEvery(SendMessage, sendMessageSaga, params));
    });
  });
  describe('sendMessageSaga', () => {
    it('should call emit with the action message', () => {
      const emitSpy = jest.fn();
      const params = { socket: { emit: emitSpy } };
      const message = 'Hello world';
      const sendSaga = sendMessageSaga(params, { message });
      sendSaga.next();
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith('chat message', message);
    });
  });
});
