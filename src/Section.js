import React, { Component } from 'react';
import { FieldType, Objects } from './def/type';

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
    }

    componentDidMount() {
        if (this.props.objList) {
            let newSectionObject = {
                name: this.state.section.title,
                items: []
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

        console.log(newItem);
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
                return value.id != removedId;
            }
        );

        return filtered;
    }

    render() {
        let section = this.state.section;
        let itemList = this.state.itemList.map(
            (param) => {
                return (
                    <Item key={param.id} data={param} handleRemoveClick={this.handleRemoveClick} temp={this.state.sectionObject}/>
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