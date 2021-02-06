import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../useFetch';
import moment from 'moment';
import './InfoPreview.css';
import logo from '../assets/logo.png';

const InfoPreview = () => {
  const { id } = useParams();
  const { data: payment } = useFetch(
    'https://church-payment.herokuapp.com/payments' + id
  );
  const [show, setShow] = React.useState(true);

  // const paymentInformation = {
  //   tithes: 'Tithes',
  //   contribution: 'Contribution',
  //   offering: 'Offering',
  //   others: 'Other',
  // };
 

  const handlePrint = () => {
    setShow(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    payment && (
      <div className='preview'>
        <div className='title'>
          <img src={logo} alt='Church Logo' />
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div className='user-info'>
          <h3>{payment.memberName}</h3>
          <p>0{payment.telephone}</p>
        </div>
        <div className='content'>
          <table className='preview-table'>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>GHS {payment.amount}</td>
                <td>{payment.paymentType}</td>
                <td>{moment(payment.date).utc().format('MM/DD/YYYY')}</td>
              </tr>
            </tbody>
          </table>
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
    )
  );
};

export default InfoPreview;
