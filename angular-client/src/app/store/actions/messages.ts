import { Action } from '@ngrx/store';

export const ADD_MESSAGES = 'ADD_MESSAGES';

export class AddMessagesAction implements Action {
  readonly type = ADD_MESSAGES;
  constructor(public payload: { messages: string[] }) {}
}

export type MessagesActions = AddMessagesAction;
