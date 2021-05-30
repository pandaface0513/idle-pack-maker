import React, { Component } from 'react';

import './style/Hub.css';

class Hub extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        let gridList = [];
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