import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Output()
  messageSend: EventEmitter<string> = new EventEmitter();

  messageForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({ message: '' });
  }

  sendMessage() {
    const message = this.messageForm.get('message').value;
    if (message !== '') {
      this.messageSend.emit(message);
      this.messageForm.setValue({ message: '' });
    }
  }
}
