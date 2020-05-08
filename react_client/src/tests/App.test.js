import React from 'react';
import App from '../App';
import { mount } from 'enzyme';

describe('App', () => {
  let app;
  beforeEach(() => {
    app = mount(<App />);
  });
  afterEach(() => {
    app.unmount();
  });
  it('Should render', () => {
    expect(app).toMatchSnapshot();
  });
});
