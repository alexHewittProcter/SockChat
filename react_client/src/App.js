import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageContainerComponent from './components/MessageContainer/MessageContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MessageContainerComponent />
      </div>
    );
  }
}

export default App;
