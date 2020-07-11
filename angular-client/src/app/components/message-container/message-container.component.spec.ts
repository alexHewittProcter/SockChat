import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContainerComponent } from './message-container.component';
import { Store, StoreModule } from '@ngrx/store';
import { getMessages } from '../../core/store/selectors';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SendMessageAction } from '../../core/store/actions';
import { reducers, AppState } from '../../core/store/reducers';
import { of } from 'rxjs';

describe('MessageContainerComponent', () => {
  let component: MessageContainerComponent;
  let fixture: ComponentFixture<MessageContainerComponent>;
  let selectSpy: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;
  let state: AppState;
  const store: Store<AppState> = null;

  beforeEach(async(() => {
    state = {
      messages: { messages: [] },
    };
    selectSpy = jasmine.createSpy('select').and.callFake((selector: any) => {
      return of(selector.call(store, state));
    });
    dispatchSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot(reducers)],
      declarations: [MessageContainerComponent, MessageInputComponent, MessageListComponent],
      providers: [{ provide: Store, useValue: { select: selectSpy, dispatch: dispatchSpy } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on initialisation', () => {
    it('should select `getMessages`', () => {
      expect(selectSpy).toHaveBeenCalledWith(getMessages);
    });
  });

  describe('sendMessage method', () => {
    it('should dispatch `AddMessageAction` when called', () => {
      const message = 'Test message';
      component.sendMessage(message);
      expect(dispatchSpy).toHaveBeenCalledWith(new SendMessageAction(message));
    });
  });
});
