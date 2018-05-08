import React, { Component } from 'react';
import axios from 'axios';
import './header.css';

class MLHeader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: '',
            searched: false
        };
    }

    getItems(query = '') {
        query = query.replace(/[^\w\s]/gi, '');
        axios.get(`http://localhost:3001/api/items?q=${query}`)
        .then(res => {
            if (!this.props.search) return;
            this.props.search({
                items: res.data.items,
                categories: res.data.categories
            });
        });
    }
    
    handleChange(e) {
        this.setState({query: e.target.value});
    }

    handleClick(e) {
        e.preventDefault();
        this.getItems(this.state.query);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getItems(this.state.query);
    }

    render() {
        let search = this.props.query ? this.props.query : this.state.query; 
        
        if (this.props.query && !this.state.searched) {
            this.setState({query: this.props.query,searched: this.state.query === this.props.query});
            this.getItems(this.props.query);
        }

        return (
            <div className="ml-header">
                <div className="ml-header-box">
                    <span className="ml-logo"></span>
                    <form className="ml-search" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="ml-input-group">
                            <input type="text" 
                                value={search} 
                                autoComplete="off" 
                                onChange={this.handleChange.bind(this)} 
                                placeholder="Nunca dejes de buscar"/>

                            <a className="ml-btn-search" onClick={this.handleClick.bind(this)}> </a>
                        </div>
                    </form>
                </div>    
            </div>
        );
    }
}

export default MLHeader;