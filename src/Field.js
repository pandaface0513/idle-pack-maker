import React, { Component } from 'react';

import { FieldType, Objects } from './def/type';
import './style/Field.css';

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: props.data,
        }
    }

    componentDidMount() {
        if (this.props.temp.params) {
            let newFieldObject = {
                name: this.state.field.name,
                type: this.state.field.type,
                value: this.state.field.value,
            };
            this.props.temp.params.push(newFieldObject);
        }
    }

    render() {
        let field = this.state.field;
        let type = "";

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
            default:
            {
                type = "text";
            }
        }

        return (
            <div className="Field">
                {field ? field.name : "1"} : <input type={type} placeholder={field.value}/>
            </div>
        )
    }
}

export default Field;