import { TestBed } from '@angular/core/testing';
import { StoreModule, Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { reducers } from '../reducers';
import { Observable, of } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';
import { MessagesEffects } from './messages';
import { Actions } from '@ngrx/effects';
import { SendMessageAction } from '../actions';
import { hot, cold } from 'jasmine-marbles';

describe('Messages Effects', () => {
  let actions$: Observable<Action>;
  let effects: MessagesEffects;

  let dispatchSpy: jasmine.Spy;
  let sendMessageSpy: jasmine.Spy;

  beforeEach(() => {
    dispatchSpy = jasmine.createSpy();
    sendMessageSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        { provide: SocketService, useValue: { sendMessage: sendMessageSpy } },
        MessagesEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(MessagesEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('sendMessage$', () => {
    it('should return AddMessagesAction when SendMessageAction is dispatched', () => {
      const messageString = 'test message';

      const inputAction = new SendMessageAction(messageString);

      actions$ = hot('-a--', { a: inputAction });
      const expected$ = cold('---', {});

      expect(effects.sendMessage$).toBeObservable(expected$);
      expect(sendMessageSpy).toHaveBeenCalledWith(messageString);
    });
  });
});
