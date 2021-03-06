import React, { Component } from 'react';

import { PlaceholderValue } from './def/type';
import Field from './Field';
import './style/Item.css';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.data,
            itemName: props.data.Name.value,
            itemObject: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this._fieldOnChange = this._fieldOnChange.bind(this);
    }

    componentDidMount() {
        if (this.props.temp.items) {
            let newItemObject = {
                id: this.state.item.id,
                params: []
            }

            this.props.temp.items.push(newItemObject);

            this.setState({
                itemObject: newItemObject
            });
        }
    }

    handleClick(event) {
        this.props.handleRemoveClick(this.state.item.id);
    }

    _fieldOnChange(name, value) {
        if (name.toLowerCase() === "name") {
            this.setState({
                itemName: value
            });
        }
    }

    render() {
        if (this.state.itemObject === null) {
            return <></>;
        }

        let Item = this.state.item;
        let ItemName = this.state.itemName === PlaceholderValue.NONE ? "undefined" : this.state.itemName;

        let DataList = [];
        for (let Property in Item)
        {
            if (Property === "id")
            {
                continue;
            }
            let newDataEntry = {};
            newDataEntry["name"] = Property;
            newDataEntry["type"] = Item[Property].type;
            newDataEntry["value"] = Item[Property].value;

            DataList.push(newDataEntry);
        }

        //console.log(DataList);
        
        let FieldList = DataList.map(
            (data, index) => {
                let UKey = index+"_"+Item["id"];
                return (
                    <Field key={UKey} data={data} temp={this.state.itemObject} superOnChange={this._fieldOnChange}/>
                )
            } 
        );
        return (
            <div className="Item">
                <h4>
                    | {ItemName} | <button onClick={this.handleClick}>Remove</button>
                </h4>
                <div className="Field-Container">
                    {FieldList}
                </div>
            </div>
        )
    }
}

export default Item;