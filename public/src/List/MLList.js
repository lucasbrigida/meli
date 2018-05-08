import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './list.css';

import MLListItem from './MLListItem';

class MLList extends Component {
    render() {
        const listItems = this.props.items.map((item, index) => 
            <Link key={index} to={`/items/${item.id}`}>
                <MLListItem item={item}/>
            </Link>
        );

        return (
            <article className="ml-container ml-list">{listItems}</article>
        ); 
    }
}

export default MLList;