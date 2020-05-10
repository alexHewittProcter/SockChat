import { messagesReducer, messagesInitialState } from './messages';
import { NewMessageAction } from '../actions';

describe('messages reducer', () => {
  it('should return initial state when no action dispatched', () => {
    const actual = messagesReducer(messagesInitialState, { type: 'null' });
    expect(actual).toEqual(messagesInitialState);
  });
  it('should add new message when NewMessageAction is received', () => {
    const message = 'Test message';
    const actual = messagesReducer(messagesInitialState, NewMessageAction(message));
    expect(actual.messages).toEqual([message]);
  });
});
