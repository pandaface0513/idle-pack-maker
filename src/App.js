import React, { Component } from 'react';
import Header from './Header';
import Content from "./Content";

import './App.css';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    )
  }
}

export default App;