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
          setPayment(res.data);
        });
    };

    fetchPayment();
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
        <h4 className='church__name'>Latebiorkorshie Circuit Grace Society</h4>
        <p>{moment().format('MMM Do YY').toUpperCase()}</p>
      </div>

      <div className='content'>
        <div className='content__info'>
          <p>Date</p>
          <p className='border'>
            {moment(payment.date).format('MMMM Do YYYY')}
          </p>
        </div>
        <div className='content__info'>
          <p>From</p>
          <p className='border'>{payment.memberName}</p>
        </div>
        <div className='content__info'>
          <p>Amount</p>
          <p className='border'>
            {payment.currency} {payment.amount}
          </p>
        </div>
        <div className='content__info'>
          <p>For</p>
          <p className='border'>{payment.narration}</p>
        </div>
        <div className='content__info'>
          <p>By</p>
          <p className='border'>{payment.memberName}</p>
        </div>
        <div className='content__info'>
          <p>Type</p>
          <p className='border'>{payment.paymentType}</p>
        </div>
      </div>
      <div className='payment__mode'>
        <h4>PAID WITH {payment.paymentMethod}</h4>
        <p>
          ...Always give yourselves fully to the work of the Lord, because you
          know that your labor in the Lord is not in vain. (1 Corinthians 15:58)
        </p>
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
