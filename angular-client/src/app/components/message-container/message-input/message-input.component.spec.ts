import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInputComponent } from './message-input.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

let messageSend = jasmine.createSpy();

@Component({ template: `<app-message-input (messageSend)="messageSend($event)"></app-message-input>` })
class TestHostComponent {
  messageSend = messageSend;
}

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    messageSend = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestHostComponent, MessageInputComponent],
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

  it('should emit a message when entered and `send` is clicked', () => {
    const form = fixture.debugElement.query(By.css('.input-group'));
    const button = form.children[1].children[0];

    component.messageForm.setValue({ message: 'Hello' });
    button.nativeElement.click();
    expect(messageSend).toHaveBeenCalledWith('Hello');
  });
  describe('`sendMessage` method', () => {
    it('should emit a message the method is called with a value for the input', () => {
      component.messageForm.setValue({ message: 'Hello' });
      component.sendMessage();
      expect(messageSend).toHaveBeenCalledWith('Hello');
    });
    it('should not emit a message the method is called with no value for the input', () => {
      component.messageForm.setValue({ message: '' });
      component.sendMessage();
      expect(messageSend).toHaveBeenCalledTimes(0);
    });
  });
});
