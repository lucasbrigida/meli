import React, { Component } from 'react';
import './breadcrumb.css';

class MLBreadcrumb extends Component {
    render() {
        let categories = this.props.categories || [];
        categories.map((category, index) => 
            <li key={index} className="ml-breadcrumb-item">{category}</li>
        );

        return (
            <nav className="ml-container">
                <ul className="ml-breadcrumb">{categories}</ul>
            </nav>
        );
    }
}

export default MLBreadcrumb;