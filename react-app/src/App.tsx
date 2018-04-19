import * as React from 'react';
import './App.css';
import HackerNewsList from './HackerNewsList';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </div>
        <HackerNewsList />
      </>
    );
  }
}

export default App;
