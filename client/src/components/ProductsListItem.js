import React from 'react';
import { Link } from 'react-router-dom';
import ImgShipping from './../assets/ic_shipping.png';

const ProductsListItem = (props) => {
  return (
    <div className="product-item">
      <div className="row">
        <div className="col-12 col-md-3 pl-0">
          <Link to={`/items/${props.product.id}`}>
            <img
              className="rounded img-fluid thumb"
              src={props.product.picture}
              alt='Product'
            />
          </Link>
        </div>
        <div className="col-12 col-md-6">
          <div className="info-product">
            <Link to={`/items/${props.product.id}`}>
              <span>{props.product.price.amount}</span>
            </Link>
            <img src={ImgShipping} alt="shipping" />
            <h2>{props.product.title}</h2>
          </div>
        </div>
        <div className="col-12 col-md-3 pr-0">
          <div className="address">
            <p>{props.product.address}</p>
          </div>
        </div>
      </div>
    </div>

  );

};

export default ProductsListItem;
