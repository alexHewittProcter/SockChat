import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListComponent } from './message-list.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ template: `<app-message-list [messages]="messages"></app-message-list>` })
class TestHostComponent {
  messages = [];
}

describe('MessageListComponent', () => {
  let hostComponent: TestHostComponent;
  let component: MessageListComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, MessageListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displaying messages', () => {
    it('should display no messages when an empty list is passed', () => {
      const messages = fixture.debugElement.queryAll(By.css('.message'));
      expect(messages.length).toBe(0);
    });
    it('should display messages when a list of messages are passed through', () => {
      const messagesList = ['Test1', 'test2'];
      hostComponent.messages = messagesList;
      fixture.detectChanges();
      const messages = fixture.debugElement.queryAll(By.css('.message'));
      expect(messages.length).toBe(messagesList.length);
      expect(messages.map((el) => el.nativeElement.textContent)).toEqual(messagesList);
    });
  });
});
