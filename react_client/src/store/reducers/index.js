import { combineReducers } from 'redux';
import { messagesReducer } from './messages';

export const appReducer = combineReducers({ messages: messagesReducer });

export default appReducer;
