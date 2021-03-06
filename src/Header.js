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
            title: "Idle Pack Maker",
            tagline: "Use this to create an idle pack configuration."
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