import React, { Component } from 'react';

import MLHeader from '../Header/MLHeader';
import MLBreadcrumb from '../Breadcrumb/MLBreadcrumb';
import MLItemDetail from '../ItemDetail/MLItemDetail';
import MLFooter from '../Footer/MLFooter';


class MLDetalhe extends Component {
  render() {
    const {categories} = this.props;

    return (
      <div>
        <MLHeader/>
        <MLBreadcrumb categories={categories}/>
        <MLItemDetail itemId={this.props.itemId}/>
        <MLFooter/>
      </div> 
    );
  }
}

export default MLDetalhe;
