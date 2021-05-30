import React, { Component } from 'react';

import './style/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            tagline: ""
        }
    }

    componentDidMount() {
        this.setState({
            title: "Hub Pack Maker",
            tagline: "Use this to create a hub pack configuration."
        });
    }

    render() {
        return (
            <header>
                <h1>{this.state.title}</h1>
                <p>{this.state.tagline}</p>
                <hr/>
            </header>
        )
    }
}

export default Header;