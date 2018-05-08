import React, { Component } from 'react';
import axios from 'axios';

import './itemDetail.css';

class MLItemDetail extends Component {
    constructor() {
        super();

        this.state = {
            item: {}
        };
    }
    
    componentDidMount() {
        axios.get(`http://localhost:3001/api/items/${this.props.itemId}`)
        .then(res => {
            const item = res.data.item;
            this.setState({ item });
        });
    }

    render() {
        const { item } =  this.state;
        
        let itemCondition = item.condition === 'new' ? 'Nuevo' : 'Usado',
            itemPriceAmount = item.price && item.price.amount.toString(),
            itemPriceDecimals = item.price && item.price.decimals.toString().padStart(2, '0');

        return (
            <article className="ml-container ml-list">
                <section className="ml-list-item-detail">
                    <div className="ml-list-item-detail-content">
                        <div className="ml-list-item-detail-image">
                            <img src={item.picture} alt={item.title}/>
                        </div>
                        <div className="ml-list-item-detail-info">
                            <div className="row">
                                <div className="ml-list-item-detail-status">
                                    {itemCondition} - {item.sold_quantity} vendidos</div>
                                <div className="ml-list-item-detail-name">{item.title}</div>
                                <div className="ml-list-item-detail-price">$ {itemPriceAmount}<span className="ml-list-item-detail-price-cents">{itemPriceDecimals}</span></div>
                            </div>
                            <div className="row">
                                <button className="ml-list-item-detail-buy-btn" href="#">Comprar</button>
                            </div>
                        </div>
                    </div>
                    <div className="ml-list-item-detail-description">
                        <span className="title">Descripción del producto</span>
                        <span className="content">
                            {item.description || 'No hay una descripción'}
                        </span>
                    </div>
                </section>
            </article>
        );
    }
}

export default MLItemDetail;