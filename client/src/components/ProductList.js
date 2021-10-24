import React from 'react';
import _ from 'lodash';
import ClipLoader from './Loader';
import ProductsListItem from './ProductsListItem';
import NotFoundProductSearchMsg from './NotFoundProductSearchMsg';

const ProductList = (props) => {

  // cargar loop
  if (props.loading) {
    return <ClipLoader text="Cargando..." />
  }

  // cargar lista o mostrar NotFound si esta vacia
  let products = [];
  if (_.isEmpty(props.products)) {
    return <NotFoundProductSearchMsg />;
  } else {
    products = props.products.map((product) => {
      return <ProductsListItem key={product.id} product={product} />;
    });
  }

  // mostrar titulo en pestaña
  if (typeof document !== 'undefined') {
    const customTittle = `${props.lastCategory} - Mercado Libre Argentina`;
    document.title = customTittle !== document.title ? customTittle : document.title;
  }

  return (
    <div className="container">
      <div className="col-md-10 mx-md-auto mb-5">
        <div className="container-fluid product-list rounded">
          {products}
        </div>
      </div>
    </div>);
};

export default ProductList;
