import React, { Component } from 'react';
import { States } from './def/config';

import './style/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this._GoToHub = this._GoToHub.bind(this);
        this._GoToMaker = this._GoToMaker.bind(this);
    }

    componentDidMount() {
    }

    _GoToHub(event) {
        this.props.SuperNavigationChange(0);
        event.preventDefault();
    }

    _GoToMaker(event) {
        this.props.SuperNavigationChange(1);
        event.preventDefault();
    }

    render() {
        let displayTagline;
        let currentStateId = this.props.data.states[this.props.data.currentState];

        for (let state of States) {
            if (state.id === currentStateId) {
                displayTagline = state.tagline;
            }
        }

        return (
            <header>
                <a className={currentStateId === "Hub" ? "nav-button selected" : "nav-button"} onClick={this._GoToHub}>Hub</a>
                <a className={currentStateId === "Maker" ? "nav-button selected" : "nav-button"} onClick={this._GoToMaker}>Maker</a> 
                <p className="tagline">{displayTagline}</p>
            </header>
        )
    }
}

export default Header;