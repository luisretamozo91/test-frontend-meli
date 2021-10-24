import React, { Component } from 'react';
import _ from 'lodash';
import { parse } from 'qs';
import SearchBar from '../components/SearchBar';
import BreadCrumbs from '../components/BreadCrumbs'
import ProductsList from '../components/ProductList';

const removeDiacritics = require('diacritics').remove;

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      search: '',
      categories: [],
      loading: true };
  }

  async componentDidMount() {
    if (!_.isEmpty(this.props.location.search) && _.isEmpty(this.state.products)) {
      const queryString = parse(this.props.location.search, { ignoreQueryPrefix: true });
      await this.requestGetProducts(queryString.search);
    }
  }

  requestGetProducts = async (search) => {
    let res = await fetch('http://localhost:8083/api/items?search=' + search)
    let data = await res.json()

    this.setState({
      products: data.items,
      categories: data.categories,
      loading: false
    })

  }

  componentDidUpdate(prevProps) {
    if (!_.isEmpty(this.props.location.search)
      && !_.isEmpty(prevProps.location.search)
      && prevProps.location.search !== this.props.location.search) {
      const queryString = parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.requestGetProducts(queryString.search);
    }
  }

  render() {
    const lastCategory = this.state.categories ? this.state.categories[this.state.categories.length-1] : [];
    return (
      <div>
        <SearchBar history={this.props.history} />
        <h1 className='hidden-title'>{this.state.search} - Mercado Libre Argentina</h1>
        <BreadCrumbs crumbs={this.state.categories} />
        <ProductsList
          lastCategory={lastCategory}
          products={this.state.products}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default SearchPage;
