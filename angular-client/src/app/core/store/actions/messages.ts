import { Action } from '@ngrx/store';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;
  constructor(public payload: string) {}
}

export class SendMessageAction implements Action {
  readonly type = SEND_MESSAGE;
  constructor(public payload: string) {}
}

export type MessagesActions = AddMessageAction | SendMessageAction;
