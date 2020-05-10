import { messagesInitialState } from '../reducers/messages';
import { getMessages } from './messages';

describe('message selectors', () => {
  let initialState;
  beforeEach(() => {
    initialState = { messages: messagesInitialState };
  });
  it('should return all messages when using getMessages selector', () => {
    expect(getMessages(initialState)).toEqual(initialState.messages.messages);
  });
});
