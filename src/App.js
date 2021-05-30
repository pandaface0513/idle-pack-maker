import React, { Component } from 'react';
import Header from './Header';
import Maker from "./Maker";
import Hub from "./Hub";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      states: ["Hub", "Maker"],
      currentState: 0
    };

    this._OnNavigationChange = this._OnNavigationChange.bind(this);
  }

  componentDidMount() {

  }

  _OnNavigationChange(value) {
    this.setState(
      {
        currentState : value
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state} SuperNavigationChange={this._OnNavigationChange} />
        {this.state.currentState === 0 ? <Hub /> : <Maker />}
      </div>
    )
  }
}

export default App;