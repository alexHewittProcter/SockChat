import { MessagesState, MessagesStateReducer } from './messages';
import { AddMessagesAction } from '../actions';

describe('message reducer', () => {
  let mockStartingData: MessagesState;
  beforeEach(() => {
    mockStartingData = { messages: [] };
  });

  it('should add messages on a `AddMessagesAction` action', () => {
    const message = 'Hello there, general kenobi';
    const action = new AddMessagesAction({ messages: [message] });

    const returnState = MessagesStateReducer(mockStartingData, action);

    expect(returnState.messages).toEqual([message]);
  });
});
