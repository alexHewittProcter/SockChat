const { default: ChatRoom } = require('../page_objects/ChatRoom');
const { default: App } = require('../page_objects/App');

describe('Chat room spec', () => {
  it('Should send a message when entering an input and clicking send', () => {
    cy.visit(App.base_url);

    const newMessage = 'Cypress message';

    ChatRoom.getInput().type(newMessage);
    ChatRoom.getInput().should(($input) => {
      const val = $input.val();

      expect(val).to.equal(newMessage);
    });

    ChatRoom.getSendButton().click();

    ChatRoom.getInput().should(($input) => {
      const val = $input.val();

      expect(val).to.equal('');
    });
    ChatRoom.getLastMessage().should('have.text', newMessage);
  });
});
