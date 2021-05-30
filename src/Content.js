import React, { Component } from 'react';
import { Objects } from './def/type';

import Section from './Section';

import './style/Content.css';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            currentSection: null,
            tempObject: {
                Objects: []
            },
        }

        this._OnGenerate = this._OnGenerate.bind(this);
        this._OnDownload = this._OnDownload.bind(this);
    }

    componentDidMount() {
        this.setState({
            sections: Objects
        })
    }

    _OnGenerate(event) {
        //console.log(this.state.tempObject);

        this.setState({
            tempObject: this.state.tempObject
        })
    }

    _OnDownload(event) {
        //console.log("Download is clicked");

        // TODO: Download code....
    }

    render() {
        let sections = this.state.sections;
        let sectionList = sections.map(
            (section) => {
                return (
                    <Section key={section.title} data={section} objList={this.state.tempObject.Objects}/>
                )
            }
        );

        return (
            <React.Fragment>
                <div id="Sections-Container">
                    {sectionList}
                </div>
                <div id="Result-Container">
                    <textarea rows="25" cols="100" placeholder="add objects above and then press generate."
                        value={this.state.tempObject.Objects.length > 0 ? JSON.stringify(this.state.tempObject) : ""} readOnly/>
                    <br/>
                    <button onClick={this._OnGenerate}>Generate</button>
                    |
                    <button onClick={this._OnDownload}>Download</button>
                    <br/>
                </div>
            </React.Fragment>
        )
    }
}

export default Content;