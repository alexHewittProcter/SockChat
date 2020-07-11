import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { AddMessageAction } from '../store/actions';

describe('SocketService', () => {
  let dispatchSpy: jasmine.Spy;
  let fromEventSubject: Subject<string>;
  let fromEventSpy: jasmine.Spy;
  let disconnectSpy: jasmine.Spy;
  let emitSpy: jasmine.Spy;
  let service: SocketService;

  beforeEach(() => {
    fromEventSubject = new Subject();

    disconnectSpy = jasmine.createSpy();
    dispatchSpy = jasmine.createSpy();
    emitSpy = jasmine.createSpy();
    fromEventSpy = jasmine.createSpy();
    fromEventSpy.and.returnValue(fromEventSubject);

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: { dispatch: dispatchSpy } },
        {
          provide: Socket,
          useValue: { fromEvent: fromEventSpy, emit: emitSpy, disconnect: disconnectSpy },
        },
        SocketService,
      ],
    });

    service = TestBed.get(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('lifecylces', () => {
    describe('on init', () => {
      it('should call `fromEvent` method on socket', () => {
        expect(fromEventSpy).toHaveBeenCalledWith('chat message');
      });
    });
    describe('on destroy', () => {
      beforeEach(() => {
        service.ngOnDestroy();
      });
      it('should stop subscribing to the chat message observer', () => {
        expect(fromEventSubject.observers).toEqual([]);
      });
      it('should disconnect from socket', () => {
        expect(disconnectSpy).toHaveBeenCalled();
      });
    });
  });
  describe('methods', () => {
    describe('sendMessage', () => {
      it('should emit a message to the socket when called', () => {
        const message = 'Test message';
        service.sendMessage(message);
      });
    });
  });
  describe('listening to events from socket', () => {
    it('should dispatch an `AddMessageAction` when a `chat message` is received', () => {
      const message = 'Test messages';
      fromEventSubject.next(message);

      expect(dispatchSpy).toHaveBeenCalledWith(new AddMessageAction(message));
    });
  });
});
