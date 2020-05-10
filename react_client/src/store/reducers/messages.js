import { NewMessage } from '../actions';

export const messagesInitialState = {
  messages: [],
};

export function messagesReducer(state = messagesInitialState, action) {
  switch (action.type) {
    case NewMessage:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
}
