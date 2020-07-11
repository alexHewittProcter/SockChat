import { ADD_MESSAGE, MessagesActions } from '../actions';

export interface MessagesState {
  messages: string[];
}

const initailMessagesState: MessagesState = { messages: [] };

export function MessagesStateReducer(state = initailMessagesState, action: MessagesActions) {
  switch (action.type) {
    case ADD_MESSAGE:
      return { messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
