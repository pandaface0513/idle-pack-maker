import React, { Component } from 'react';

import { FieldType } from './def/type';
import './style/Field.css';

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: props.data,
            value: props.data.value,
            fieldObject: {}
        }

        this._OnChange = this._OnChange.bind(this);
    }

    componentDidMount() {
        if (this.props.temp.params) {
            let newFieldObject = {
                name: this.state.field.name,
                type: this.state.field.type,
                value: this.state.field.value,
            };
            this.props.temp.params.push(newFieldObject);

            this.setState({
                fieldObject: newFieldObject
            });
        }
    }

    _OnChange(event) {
        //console.log('Input ' + event.target.name + ' changed: ' + event.target.value);

        this.state.fieldObject.value = event.target.value;

        this.setState({
            value: event.target.value
        });

        this.props.superOnChange(event.target.name, event.target.value);
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
                {field ? field.name : "1"} : <input name={field.name} type={type} placeholder={field.value} onChange={this._OnChange}/>
            </div>
        )
    }
}

export default Field;