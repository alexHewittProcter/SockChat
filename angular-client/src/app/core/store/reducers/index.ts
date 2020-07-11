import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { MessagesState, MessagesStateReducer } from './messages';

export interface AppState {
  messages: MessagesState;
}

export const reducers: ActionReducerMap<AppState> = { messages: MessagesStateReducer };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
