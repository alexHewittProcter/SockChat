import React from 'react';
import MessageListComponent from './MessageList';
import { mount } from 'enzyme';
describe('MessageListComponent', () => {
  let messageListComponent;
  beforeEach(() => {
    messageListComponent = mount(<MessageListComponent></MessageListComponent>);
  });
  afterEach(() => {
    if (!!messageListComponent) {
      messageListComponent.unmount();
    }
  });
  it('should render', () => {
    expect(messageListComponent).toMatchSnapshot();
  });
  it('should render any messages passed to it using the `messages` prop', () => {
    const props = {
      messages: ['Hello', 'Testing'],
    };
    messageListComponent = mount(<MessageListComponent {...props}></MessageListComponent>);
    const list = messageListComponent.find('#message-list');
    expect(list.children().length).toEqual(props.messages.length);
    expect(list.children().first().text()).toEqual(props.messages[0]);
    expect(list.childAt(1).text()).toEqual(props.messages[1]);
    expect(messageListComponent).toMatchSnapshot();
  });
  describe('lifecycles',()=>{
    describe('ComponentDidMount',()=>{})
    describe('')
  })
});
