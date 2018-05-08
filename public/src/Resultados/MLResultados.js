import React, { Component } from 'react';

import MLHeader from '../Header/MLHeader';
import MLBreadcrumb from '../Breadcrumb/MLBreadcrumb';
import MLList from '../List/MLList';
import MLFooter from '../Footer/MLFooter';

class MLResultados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      items: []
    };
  }

  setItems({items, categories}) {
    this.setState({items, categories});
  }

  render() {
    const {categories, items} = this.state;
    const {query} = this.props;

    return (
      <div>
        <MLHeader query={query} search={this.setItems.bind(this)}/>
        <MLBreadcrumb categories={categories}/>
        <MLList items={items}/>
        <MLFooter/>
      </div>  
    );
  }
}

export default MLResultados;
