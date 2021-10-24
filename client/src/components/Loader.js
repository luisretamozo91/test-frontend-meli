import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = (props) => {
  return (<div className='loader'>
    <ClipLoader
      color={'#FFE600'}
    />
    <p>{props.text}</p>
  </div>);
};

export default Loader;
