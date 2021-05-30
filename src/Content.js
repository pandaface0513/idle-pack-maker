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

        this._OnUpload = this._OnUpload.bind(this);
        this._fileSelected = this._fileSelected.bind(this);
        this._fileLoaded = this._fileLoaded.bind(this);
        this._OnGenerate = this._OnGenerate.bind(this);
        this._OnDownload = this._OnDownload.bind(this);

        this._OnSectionUpdate = this._OnSectionUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            sections: Objects
        })
    }

    _OnGenerate(event) {
        //console.log(this.state.tempObject);
    }

    _OnDownload(event) {
        //console.log("Download is clicked");

        // TODO: Download code....
        if (this.state.tempObject.Objects.length > 0) {
            let objectWrapper = {
                Objects: this.state.sections
            }
            let json_string = JSON.stringify(objectWrapper, undefined, 2);
            let link = document.createElement('a');
            let blob = new Blob([json_string], {type: 'text/plain'});
            link.download = 'data.json';
            link.href = window.URL.createObjectURL(blob);
            link.click();
        } else {
            alert("Nothing to generate.")
        }
    }

    _OnUpload(event) {
        let fileElem = document.getElementById("input");
        if (fileElem) {
            fileElem.click();
        }
    }

    _fileSelected(event) {
        let file = event.target.files[0];

        let accept = ["application/json"];
        if (file != null) {
            if (accept.indexOf(file.type) > -1) {
                // file is of type text, let's read it
                console.log(this);
                let reader = new FileReader();
                reader.onload = this._fileLoaded;
                reader.onload.bind(this);
                reader.readAsText(file);
            }
            else {
                alert("We don't accept this file. Please retry.");
                alert(file.type);
                console.log(file);
            }
        }
    }

    _fileLoaded(event) {
        console.log("----- File Read -----");
        console.log(event.target.result);

        let parse = JSON.parse(event.target.result);
        console.log(parse);

        this.setState({
            sections: parse.Objects
        });
        this.setState({});
    }

    _OnSectionUpdate(sectionTitle, itemId, fieldName, value) {
        //
        console.log(`Content:OnChange - ${sectionTitle} - ${itemId} - ${fieldName} - ${value}`);
        let MutableSections = this.state.sections;
        let bDirty = false;

        for (let section of MutableSections) {
            if (section.title === sectionTitle) {
                console.log(`Found ${section.title}`);
                console.log(section.items);
                for (let item of section.items) {
                    console.log(`comparing ${item.id} vs ${itemId}`);
                    if (item.id === itemId) {
                        console.log(`Found ${item.id}`);
                        for (let param of item.params) {
                            if (param.name === fieldName) {
                                console.log(`Found ${param.name}`)
                                param.value = value;
                                bDirty = true;
                            }
                        }
                    }
                }
            }
        }

        if (bDirty) {
            this.setState({
                sections : MutableSections
            });
        }
    }

    render() {
        let sections = this.state.sections;
        let sectionList = sections.map(
            (section) => {
                return (
                    <Section key={section.title} data={section} objList={this.state.tempObject.Objects} SuperSectionChange={this._OnSectionUpdate}/>
                )
            }
        );

        return (
            <React.Fragment>
                <input type="file" id="input" onChange={this._fileSelected} accept="application/json" style={{display: 'none'}}></input><button onClick={this._OnUpload}>Upload Existing</button>
                <hr/>
                <div id="Sections-Container">
                    {sectionList}
                </div>
                <div id="Result-Container">
                    <h4>| Result Configurations |</h4>
                    <textarea rows="25" cols="100" placeholder="add objects above and then press generate."
                        value={this.state.tempObject.Objects.length > 0 ? JSON.stringify(this.state.sections, undefined, 2) : ""} readOnly/>
                    <br/>
                    <button onClick={this._OnGenerate}>Generate</button> | <button onClick={this._OnDownload}>Download</button>
                    <br/>
                </div>
            </React.Fragment>
        )
    }
}

export default Content;