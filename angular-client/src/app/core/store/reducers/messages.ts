import { ADD_MESSAGES, MessagesActions } from '../actions';

export interface MessagesState {
  messages: string[];
}

const initailMessagesState: MessagesState = { messages: [] };

export function MessagesStateReducer(state = initailMessagesState, action: MessagesActions) {
  switch (action.type) {
    case ADD_MESSAGES:
      return { messages: [...state.messages, ...action.payload.messages] };
    default:
      return state;
  }
}
