import React from 'react';
import _ from 'lodash';
import ClipLoader from './Loader';
import NotFoundProductSearchMsg from './NotFoundProductSearchMsg';

const ProductDetails = (props) => {
  if (props.loading) {
    return <ClipLoader text="Cargando detalle del producto..." />
  }


  if (_.isEmpty(props.product)) {
    return <NotFoundProductSearchMsg />;
  }

  const description = props.product.description.split('\n').map((item, key) => {
    return (_.isString(item) ? !!_.trim(item) : _.isEmpty(item))
      ? <span key={key}>{item}<br /></span> : <br key={key} />;
  });


  return (
    <div className="container">
      <div className="col-md-10 mx-md-auto mb-5">
        <div className="container-fluid product-detail rounded">
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="text-center">
                <img className="img-fluid" src={props.product.picture} alt='Product' />
              </div>
              <div className="content-description">
                <h2>Descripcion del Producto</h2>
                <p>{description}</p>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <p className="small">{props.product.condition}{props.product.sold_quantity !== 0 ? ` - ${props.product.sold_quantity} vendidos` : ''}</p>
              <h3>{props.product.title}</h3>
              <h1>{props.product.price.amount}</h1>
              <div className="button-comprar">
                <button type="button" className="btn btn-primary btn-block">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default ProductDetails;
