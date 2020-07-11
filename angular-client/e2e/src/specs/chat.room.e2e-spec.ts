import { AppPage } from '../app.po';
import { ChatRoom } from '../page-objects/chat.room.po';
import { browser, ExpectedConditions } from 'protractor';

describe('chat room', () => {
  beforeEach(() => {
    AppPage.navigateTo();
    browser.ignoreSynchronization = true;
  });

  describe('lower input bar', () => {
    it('should add a message to the page when clicking the send button', () => {
      ChatRoom.getInput().sendKeys('Message');
      ChatRoom.getSendButton().click();

      expect(ChatRoom.getLastMessageFromlist().getText()).toEqual('Message');
      ChatRoom.getInput().sendKeys('Send message');
      ChatRoom.getSendButton().click();
      expect(ChatRoom.getLastMessageFromlist().getText()).toEqual('Send message');
    });
  });
});
