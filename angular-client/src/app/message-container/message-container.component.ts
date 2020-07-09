import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getMessages } from '../store/selectors';
import { AddMessagesAction } from '../store/actions';

@Component({
  selector: 'app-message-container',
  template: `<app-message-list [messages]="messages$ | async"></app-message-list>
    <app-message-input (messageSend)="sendMessage($event)"></app-message-input>`,
  styleUrls: ['./message-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageContainerComponent implements OnInit {
  messages$: Observable<string[]>;
  constructor(private store: Store) {
    this.messages$ = this.store.select(getMessages);
  }

  ngOnInit() {}

  sendMessage(message: string) {
    this.store.dispatch(new AddMessagesAction({ messages: [message] }));
  }
}
