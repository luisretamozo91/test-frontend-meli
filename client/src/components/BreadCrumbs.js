import React from 'react';
import _ from 'lodash';

const BreadCrumbs = (props) => {
  let breadcrumbs = [];
  
  if (!_.isEmpty(props.crumbs)) {
    breadcrumbs = props.crumbs.map((crumb) => {
      return <li className='breadcrumb-item' key={crumb}>{crumb}</li>;
    });
  }
  
  return (
    <div className='container'>
      <div className="col-md-10 m-md-auto">
        <ol className="breadcrumb">
            {breadcrumbs}
        </ol>
      </div>
    </div>
  );
};

export default BreadCrumbs;
