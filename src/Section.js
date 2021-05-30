import React, { Component } from 'react';

import Item from './Item';

import './style/Section.css';

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            section: props.data,
            itemList: [],
            sectionObject: null,
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
        let itemList = this.state.itemList;
        let params = this.state.section.params;
        let newItem = {};
        for (let param of params)
        {
            newItem[param.name] = {
                type: param.type,
                value: param.defaultValue
            };
        }
        newItem.id = Math.random() * 100000 + Date.now();
        
        itemList.push(newItem);

        this.setState({
            itemList: itemList
        });

        //console.log(newItem);
    }

    handleRemoveClick(removedId) {
        this.setState({
            itemList: this._filterFromList(removedId, this.state.itemList)
        });

        let items = this.state.sectionObject.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === removedId) {
                items.splice(i , 1);
            }
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

    _OnItemUpdate(item, field, value) {
        //
        console.log(`Section:OnChange - ${item} - ${field} - ${value}`);
        this.props.SuperSectionChange(this.props.data.title, item, field, value);
    }

    render() {
        if (this.props.data === null) {
            return <></>;
        }

        let section = this.props.data;
        let itemList = section.items.map(
            (item) => {
                console.log("----- Drawing Items -----");
                console.log(item);

                let itemData = {};

                for (let param of item.params)
                {
                    itemData[param.name] = {
                        type: param.type,
                        placeholder: param.defaultValue,
                        value: param.value
                    };
                }
                itemData.id = item.id;

                console.log(itemData);

                return (
                    <Item key={itemData.id} data={itemData} handleRemoveClick={this.handleRemoveClick} temp={this.state.sectionObject} SuperItemChange={this._OnItemUpdate}/>
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