import { Action } from '@ngrx/store';

export const ADD_MESSAGES = 'ADD_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export class AddMessagesAction implements Action {
  readonly type = ADD_MESSAGES;
  constructor(public payload: { messages: string[] }) {}
}

export class SendMessageAction implements Action {
  readonly type = SEND_MESSAGE;
  constructor(public payload: string) {}
}

export type MessagesActions = AddMessagesAction;
