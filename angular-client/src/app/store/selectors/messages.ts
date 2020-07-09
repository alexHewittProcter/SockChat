import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { MessagesState } from '../reducers/messages';

export const getMessagesState = (state: AppState) => state.messages;

export const getMessages = createSelector(getMessagesState, (state: MessagesState) => state.messages);
