import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './store/reducers';

describe('App', () => {
  let app;
  beforeEach(() => {
    app = shallow(
      <Provider store={createStore(appReducer)}>
        <App />
      </Provider>
    );
  });
  afterEach(() => {
    app.unmount();
  });
  it('Should render', () => {
    expect(app).toMatchSnapshot();
  });
});
