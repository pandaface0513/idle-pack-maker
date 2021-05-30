import React, { Component } from 'react';
import { DataWrapper } from './def/type'

import Header from './Header';
import Maker from "./Maker";
import Hub from "./Hub";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      states: ["Hub", "Maker"],
      currentState: 0,
      temp: DataWrapper
    };

    this._OnNavigationChange = this._OnNavigationChange.bind(this);
    this._OnApplyMakerConfig = this._OnApplyMakerConfig.bind(this);
    this._OnUploadToApp = this._OnUploadToApp.bind(this);
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

  _OnApplyMakerConfig(makerConfig) {
    this.setState({
      currentState: 0,
      temp: makerConfig
    });
  }

  _OnUploadToApp(externalConfig) {
    this.setState({
      temp: externalConfig
    });
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state} SuperNavigationChange={this._OnNavigationChange} />
        {this.state.currentState === 0 ? 
        <Hub data={this.state.temp} SuperUploadToApp={this._OnUploadToApp} /> : 
        <Maker data={this.state.temp} SuperApplyToHub={this._OnApplyMakerConfig}/>}
      </div>
    )
  }
}

export default App;