import { MessagesState, MessagesStateReducer } from './messages';
import { AddMessageAction } from '../actions';

describe('message reducer', () => {
  let mockStartingData: MessagesState;
  beforeEach(() => {
    mockStartingData = { messages: [] };
  });

  it('should add messages on a `AddMessageAction` action', () => {
    const message = 'Hello there, general kenobi';
    const action = new AddMessageAction(message);

    const returnState = MessagesStateReducer(mockStartingData, action);

    expect(returnState.messages).toEqual([message]);
  });
});
