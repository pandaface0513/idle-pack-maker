import React, { Component } from 'react';

import Item from './Item';

import './style/Section.css';

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            section: props.data
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this._OnItemUpdate = this._OnItemUpdate.bind(this);
    }

    componentDidMount() {
        if (this.props.objList) {
            let newSectionObject = {
                title: this.state.section.title,
                params: this.state.section.params,
                items: this.state.section.items
            }

            this.props.objList.push(newSectionObject);

            this.setState({
                sectionObject: newSectionObject
            });
        }
    }

    handleClick(event) {
        let template = this.state.section.template;
        let newItem = {};
        for (let param of template)
        {
            newItem[param.name] = {
                type: param.type,
                value: param.defaultValue
            };
        }
        newItem.id = Math.random() * 100000 + Date.now();
        
        this.props.SuperAddItem(this.props.data.title, newItem);
        ////console.log(newItem);
    }

    handleRemoveClick(removedId) {
        this.props.SuperRemoveItem(this.props.data.title, removedId);
    }

    _OnItemUpdate(item, field, value) {
        //
        //console.log(`Section:OnChange - ${item} - ${field} - ${value}`);
        this.props.SuperSectionChange(this.props.data.title, item, field, value);
    }

    render() {
        if (this.props.data === null) {
            return <></>;
        }

        let section = this.props.data;
        let itemList = section.items.map(
            (item) => {
                ////console.log("----- Drawing Items -----");
                //console.log(item);

                let itemData = {};

                for (let param of section.template)
                {
                    itemData[param.name] = {
                        type: param.type,
                        placeholder: param.defaultValue,
                        value: param.value
                    };

                    for (let property in item) {
                        if (property === param.name) {
                            itemData[param.name].value = item[property].value;
                        }
                    }
                }
                itemData.id = item.id;

                ////console.log(itemData);

                return (
                    <Item key={itemData.id} data={itemData} handleRemoveClick={this.handleRemoveClick} SuperItemChange={this._OnItemUpdate}/>
                )
            }
        )

        return (
            <div className="Section">
                <h4>
                    | {section ? section.title : ""} | <button onClick={this.handleClick}>Add</button>
                </h4>
                <div className="Params-Container">
                    {itemList}
                </div>
                <hr />
            </div>
        )
    }
}

export default Section;