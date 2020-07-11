import { element, by } from 'protractor';

export class ChatRoom {
  static getSendButton() {
    return element(by.css('.input-group-append .btn'));
  }

  static getInput() {
    return element(by.id('form-input'));
  }

  static getLastMessageFromlist() {
    return element(by.css('app-message-list .message-list .message:last-child'));
  }
}
