import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as MessagesActions from '../actions/messages';
import { SocketService } from '../../services/socket.service';

@Injectable()
export class MessagesEffects {
  @Effect()
  sendMessage$: Observable<Action> = this.actions$.pipe(
    ofType(MessagesActions.SEND_MESSAGE),
    switchMap((action: MessagesActions.SendMessageAction) => {
      this.socketService.sendMessage(action.payload);
      return [];
    })
  );
  constructor(private actions$: Actions, private socketService: SocketService) {}
}
