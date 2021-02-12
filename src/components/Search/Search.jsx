import React from 'react';
import useFetch from '../../useFetch';
import generatePDF from '../services/generatePDF';
import './Search.css';
import { Link } from 'react-router-dom';

const Search = () => {
  const { data: reports } = useFetch(
    'https://church-payment.herokuapp.com/payments'
  );

  return (
    <div className='search-bar'>
      <Link to='/payment'>Add Payment Record</Link>
      <button onClick={() => generatePDF(reports)}>Print Records</button>
      {/* <input type='search' placeholder='Search' /> */}
    </div>
  );
};

export default Search;
