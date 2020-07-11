import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageContainerComponent } from './message-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageContainerComponent, MessageListComponent, MessageInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MessageContainerComponent],
})
export class MessageContainerModule {}
