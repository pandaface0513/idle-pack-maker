import React, { Component } from 'react';

import './style/Link.css';

class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this._OnClick = this._OnClick.bind(this);
    }

    componentDidMount() {

    }

    _OnClick(event) {

    }

    render() {
        let displayName, linkedUri;
        console.log(this.props.data);
        displayName = this.props.data.Name.value;
        linkedUri = this.props.data.Url.value;

        return (
            <a className="Link-Item" href={linkedUri} target="_blank">
                <p>{displayName}</p>
                <p>{linkedUri}</p>
            </a>
        )
    }
}

export default Link;