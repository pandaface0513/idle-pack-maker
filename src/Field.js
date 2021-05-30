import React, { Component } from 'react';

import { FieldType, IconType } from './def/type';
import './style/Field.css';

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: props.data,
            value: props.data.value
        }

        this._OnChange = this._OnChange.bind(this);
    }

    componentDidMount() {
    }

    _OnChange(event) {
        console.log(`Field:OnChange - ${event.target.name} - ${event.target.value}`);
        this.props.SuperOnChange(event.target.name, event.target.value);
    }

    render() {
        let field = this.props.data;
        let type = "";
        let bNotADropdown = true;
        let dropdownList = "";

        switch (field.type)
        {
            case FieldType.URL:
            {
                type = "url";
                break;
            }
            case FieldType.NUMBER:
            {
                type = "number";
                break;
            }
            case FieldType.DROPDOWN:
            case FieldType.ICON_DROPDOWN:
            {
                bNotADropdown = false;   
            }
            default:
            {
                type = "text";
            }
        }

        if (!bNotADropdown) {
            if (field.type === FieldType.ICON_DROPDOWN) {
                let listOfOptions = [];
                for (let icon in IconType) {
                    listOfOptions.push(
                        {
                            name: icon,
                            value: IconType[icon]
                        }
                    );
                }
                dropdownList = listOfOptions.map(
                    (data, index) => {
                        let UKey = index+"_icon";
                        return (
                            <option key={UKey}>{data.name}</option> 
                        )
                    } 
                );
            }
        }

        return (
            <div className="Field">
                {field ? field.name : "undefined"} : 
                {bNotADropdown ? 
                    <input name={field.name} type={type} value={field.value} onChange={this._OnChange}/> : 
                    <select onChange={this._OnChange}>
                        {dropdownList}
                    </select>}
            </div>
        )
    }
}

export default Field;