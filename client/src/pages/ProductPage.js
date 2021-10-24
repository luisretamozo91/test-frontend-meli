import React, { Component } from 'react';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import BreadCrumbs from '../components/BreadCrumbs';
import ProductDetails from '../components/ProductDetails';


class ProductPage extends Component {
  constructor(props) {
    super(props);

    let initProduct = [];
    let initCategories = [];


    this.state = {
      product: initProduct,
      categories: initCategories,
      loading: false };
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.location) && _.isEmpty(this.state.product)) {
      const productId = this.props.match.params.id;
      this.getProduct(productId);
    }
  }

  getProduct(productId) {
    this.setState({ loading: true });
    ProductPage.requestInitialData(productId)
      .then((data) => {
        this.setState({
          product: data.item,
          categories: data.categories,
          loading: false });
      });
  }

  static requestInitialData(id, baseUrl = '') {
    return fetch('http://localhost:8083/api/items/' + id)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <SearchBar history={this.props.history} />
        <BreadCrumbs crumbs={this.state.categories} />
        <ProductDetails
          product={this.state.product}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default ProductPage;
