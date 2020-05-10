import { NewMessageAction, NewMessage } from './messages';

describe('messages actions', () => {
  it('should create a new message action object', () => {
    const message = 'Test message';
    const action = NewMessageAction(message);
    expect(action).toEqual({ type: NewMessage, message });
  });
});
