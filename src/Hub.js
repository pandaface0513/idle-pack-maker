import React, { Component } from 'react';
import { DataWrapper } from './def/type';

import Link from './Link';

import './style/Hub.css';

class Hub extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            links: []
        }

        this._OnUpload = this._OnUpload.bind(this);
        this._fileSelected = this._fileSelected.bind(this);
        this._fileLoaded = this._fileLoaded.bind(this);
    }

    componentDidMount() {

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
                //console.log(this);
                let reader = new FileReader();
                reader.onload = this._fileLoaded;
                reader.onload.bind(this);
                reader.readAsText(file);
            }
            else {
                alert("We don't accept this file. Please retry.");
                alert(file.type);
                //console.log(file);
            }
        }
    }

    _fileLoaded(event) {
        //console.log("----- File Loaded -----");
        //console.log(event.target.result);

        let parse = JSON.parse(event.target.result);
        //console.log(parse);

        if (parse.hasOwnProperty("version") && DataWrapper.version === parse.version) {
            this.setState({
                links: parse.Objects[0].items
            });
            this.setState({});
        } else {
            alert("The file version is outdated.");
        }
    }

    render() {
        let gridList = this.state.links.map(
            (link) => {
                return (
                    <Link key={link.id} data={link} />
                )
            }
        );
        return (
            <React.Fragment>
                <div id="Grid-Container">
                    {gridList.length > 0 ? 
                        gridList : 
                        <React.Fragment>
                            <p>There are no data, please upload one.</p>
                            <input type="file" id="input" onChange={this._fileSelected} accept="application/json" style={{display: 'none'}}></input>
                            <button onClick={this._OnUpload}>Upload Existing</button>
                        </React.Fragment>}
                </div>
            </React.Fragment>
        )
    }
}

export default Hub;