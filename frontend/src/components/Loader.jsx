import React from 'react';

export const Loader = (props) => {
  return (
    <div className={`loader ${props.isLoading ? 'loader_type_active' : ''} `}>
      <div className="loader__spinner">
      Loading...
    </div>
    </div>
   ); 
}

