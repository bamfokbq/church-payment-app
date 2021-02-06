// import React from 'react';
import './Success.css';

const Success = ({handleOpen}) => {

  return (
    <>
      <div className='success'>
        <h3>Payment Information sent successfully!!!</h3>
        <button className='btn-ok' onClick={handleOpen}>
          OK
        </button>
      </div>
    </>
  );
};

export default Success;
