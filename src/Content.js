import React, { Component } from 'react';
import { DataWrapper } from './def/type';

import Section from './Section';

import './style/Content.css';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            currentSection: null,
        }

        this._OnUpload = this._OnUpload.bind(this);
        this._fileSelected = this._fileSelected.bind(this);
        this._fileLoaded = this._fileLoaded.bind(this);
        this._OnGenerate = this._OnGenerate.bind(this);
        this._OnDownload = this._OnDownload.bind(this);

        this._OnSectionUpdate = this._OnSectionUpdate.bind(this);
        this._OnSectionAddItem = this._OnSectionAddItem.bind(this);
        this._OnSectionRemoveItem = this._OnSectionRemoveItem.bind(this);
    }

    componentDidMount() {
        this.setState({
            sections: DataWrapper.Objects
        })
    }

    _OnGenerate(event) {
        //console.log(this.state.tempObject);
    }

    _OnDownload(event) {
        //console.log("Download is clicked");

        // TODO: Download code....
        if (this.state.sections.length > 0) {
            let objectWrapper = DataWrapper;
            objectWrapper.Objects = this.state.sections;
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
        console.log("----- File Loaded -----");
        console.log(event.target.result);

        let parse = JSON.parse(event.target.result);
        console.log(parse);

        if (parse.hasOwnProperty("version") && DataWrapper.version === parse.version) {
            this.setState({
                sections: parse.Objects
            });
            this.setState({});
        } else {
            alert("The file version is outdated.");
        }
    }

    _OnSectionUpdate(sectionTitle, itemId, fieldName, value) {
        //
        //console.log(`Content:OnChange - ${sectionTitle} - ${itemId} - ${fieldName} - ${value}`);
        let MutableSections = this.state.sections;
        let bDirty = false;

        for (let section of MutableSections) {
            if (section.title === sectionTitle) {
                //console.log(`Found ${section.title}`);
                //console.log(section.items);
                for (let item of section.items) {
                    //console.log(`comparing ${item.id} vs ${itemId}`);
                    if (item.id === itemId) {
                        //console.log(`Found ${item.id}`);
                        for (let property in item) {
                            if (property === fieldName) {
                                //console.log(`Found ${param.name}`)
                                item[property].value = value;
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

    _OnSectionAddItem(sectionTitle, itemObj) {
        let MutableSections = this.state.sections;
        let bDirty = false;

        for (let section of MutableSections) {
            if (section.title === sectionTitle) {
                section.items.push(itemObj);
                bDirty = true;
            }
        }

        if (bDirty) {
            this.setState({
                sections: MutableSections
            })
        }
    }

    _OnSectionRemoveItem(sectionTitle, itemId) {
        let MutableSections = this.state.sections;
        let bDirty = false;

        for (let section of MutableSections) {
            if (section.title === sectionTitle) {
                section.items = this._filterFromList(itemId, section.items);
                bDirty = true;
            }
        }

        if (bDirty) {
            this.setState({
                sections: MutableSections
            })
        }
    }

    _filterFromList(removedId, listToFilter) {
        let filtered = listToFilter.filter(
            value => {
                return !(value.id === removedId);
            }
        );

        return filtered;
    }

    render() {
        let sections = this.state.sections;
        let sectionList = sections.map(
            (section) => {
                return (
                    <Section key={section.title} data={section} SuperSectionChange={this._OnSectionUpdate} SuperAddItem={this._OnSectionAddItem} SuperRemoveItem={this._OnSectionRemoveItem}/>
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
                        value={this.state.sections.length > 0 ? JSON.stringify(this.state.sections, undefined, 2) : ""} readOnly/>
                    <br/>
                    <button onClick={this._OnGenerate}>Generate</button> | <button onClick={this._OnDownload}>Download</button>
                    <br/>
                </div>
            </React.Fragment>
        )
    }
}

export default Content;