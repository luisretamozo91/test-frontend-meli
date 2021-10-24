import React from 'react';
import SearchBar from '../components/SearchBar';

const NotFoundPage = (props) => {
  return (
    <div>
      <SearchBar history={props.history} />
      <div className='not-found'>
        <h1>Error: 404 Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
