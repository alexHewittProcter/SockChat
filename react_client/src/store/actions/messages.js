export const NewMessage = 'NEW_MESSAGE';
export const SendMessage = 'SEND_MESSAGE';

export const NewMessageAction = (message) => ({
  type: NewMessage,
  message,
});

export const SendMessageAction = (message) => ({ type: SendMessage, message });
