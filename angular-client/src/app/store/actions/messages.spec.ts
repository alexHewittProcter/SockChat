import { AddMessagesAction, ADD_MESSAGES } from '../actions';

describe('Messages action', () => {
  it('should create a `AddMessagesAction`', () => {
    const payload = { messages: ['Hello, its ricky'] };
    const action = new AddMessagesAction(payload);

    expect({ ...action }).toEqual({ type: ADD_MESSAGES, payload });
  });
});
