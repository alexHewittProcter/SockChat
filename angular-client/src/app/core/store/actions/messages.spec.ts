import { AddMessagesAction, ADD_MESSAGES } from '../actions';
import { SendMessageAction, SEND_MESSAGE } from './messages';

describe('Messages action', () => {
  it('should create a `AddMessagesAction`', () => {
    const payload = { messages: ['Hello, its ricky'] };
    const action = new AddMessagesAction(payload);

    expect({ ...action }).toEqual({ type: ADD_MESSAGES, payload });
  });

  it('should create a `SendMessageAction`', () => {
    const payload = 'Test message';
    const action = new SendMessageAction(payload);

    expect({ ...action }).toEqual({ type: SEND_MESSAGE, payload });
  });
});
