import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddMessageAction } from '../store/actions';

@Injectable()
export class SocketService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  constructor(private store: Store, private socket: Socket) {
    this.listenToIncomingMessages();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.socket.disconnect();
  }

  private listenToIncomingMessages(): void {
    this.socket
      .fromEvent('chat message')
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg: string) => {
        this.store.dispatch(new AddMessageAction(msg));
      });
  }

  sendMessage(message: string): void {
    this.socket.emit('chat message', message);
  }
}
