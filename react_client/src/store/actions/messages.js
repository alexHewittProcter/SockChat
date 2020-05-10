export const NewMessage = 'NEW_MESSAGE';

export const NewMessageAction = (message) => ({
  type: NewMessage,
  message,
});
