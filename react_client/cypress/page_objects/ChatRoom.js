export default class ChatRoom {
  static getInput() {
    return cy.get('.message-input-bar .form-control');
  }

  static getSendButton() {
    return cy.contains('Send');
  }

  static getLastMessage() {
    return cy.get('#message-list .message:last-child');
  }
}
