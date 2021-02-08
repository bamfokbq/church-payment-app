import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './InfoPreview.css';
import logo from '../assets/logo.png';
import axios from 'axios';

const InfoPreview = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState([]);
  const [show, setShow] = React.useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      await axios
        .get(`https://church-payment.herokuapp.com/payments/${id}`)
        .then((res) => {
         setPayment(res.data)
        });
      };

    fetchPayment()
  }, [id]);

  const handlePrint = () => {
    setShow(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return payment ? (
    <div className='preview'>
      <div className='title'>
        <img src={logo} alt='Church Logo' />
        <p>{moment().format('MMM Do YY').toUpperCase()}</p>
      </div>
      <div className='user-info'>
        <h3>{payment.memberName}</h3>
        <p>0{payment.telephone}</p>
      </div>
      <div className='content'>
        <p>
          An amount of <b>GHS{payment.amount}</b> was paid for{' '}
          <b>{payment.paymentType}</b> at{' '}
          <b>{moment(payment.date).format('MMM Do YY')}</b>.
        </p>
      </div>
      <div className='narration-info'>
        <h4>Narration</h4>
        <p>{payment.narration}</p>
      </div>
      <div className='thanks'>
        <h2>Thanks</h2>
      </div>

      <div className='print-btn'>
        {show && (
          <button className='print-save-btn' onClick={handlePrint}>
            Save/Print
          </button>
        )}
      </div>
    </div>
  ) : (
    <h2>No Data available</h2>
  );
};

export default InfoPreview;
