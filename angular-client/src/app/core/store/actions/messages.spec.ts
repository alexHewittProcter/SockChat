import { AddMessageAction, ADD_MESSAGE, SendMessageAction, SEND_MESSAGE } from '../actions';

describe('Messages action', () => {
  it('should create a `AddMessageAction`', () => {
    const payload = 'Hello, its ricky';
    const action = new AddMessageAction(payload);

    expect({ ...action }).toEqual({ type: ADD_MESSAGE, payload });
  });

  it('should create a `SendMessageAction`', () => {
    const payload = 'Test message';
    const action = new SendMessageAction(payload);

    expect({ ...action }).toEqual({ type: SEND_MESSAGE, payload });
  });
});
