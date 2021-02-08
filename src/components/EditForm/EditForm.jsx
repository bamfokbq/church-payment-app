import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditForm.css';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';
// import useFetch from '../../useFetch';

const EditForm = () => {
  // const [isOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [payment, setPayment] = useState([]);

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

  const [paymentData, setPaymentData] = useState({
    memberName: '',
    telephone: '',
    paymentType: '',
    amount: '',
    narration: '',
    date: '',
  });

  const clear = () => {
    setPaymentData({
      memberName: '',
      telephone: '',
      paymentType: '',
      amount: 0,
      narration: '',
      date: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5500/payments`, { ...paymentData })
      .then((res) => {
        console.log(res);
      });

    clear();
    history.push('/record');
  };

  return (
    <div className='form-center'>
      <Header />
      {payment ? (
        <div className='form-container container'>
          <form onSubmit={handleSubmit}>
            <div className='form-element'>
              <label>
                Member Name
                <input
                  type='text'
                  value={payment.memberName}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      memberName: event.target.value,
                    })
                  }
                  placeholder='Enter your name...'
                />
              </label>
            </div>
            <div className='form-element'>
              <label>
                Contact Number
                <input
                  type='tel'
                  value={payment.telephone}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      telephone: event.target.value,
                    })
                  }
                  placeholder='Enter your phone number...'
                />
              </label>
            </div>
            <div className='form-element'>
              <label>
                Payment Type
                <select
                  value={payment.paymentType}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      paymentType: event.target.value,
                    })
                  }>
                  <option value='Default'>Choose a type of payment</option>
                  <option value='Offering'>Offering</option>
                  <option value='Tithes'>Tithes</option>
                  <option value='Contribution'>Contribution</option>
                  <option value='Others'>Others</option>
                </select>
              </label>
            </div>
            <div className='form-element'>
              <label>
                Amount
                <input
                  type='number'
                  required
                  value={payment.amount}
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      amount: event.target.value,
                    })
                  }
                  placeholder='Enter your amount...'
                />
              </label>
            </div>
            <div className='form-element'>
              <label>
                Narration
                <textarea
                  className='form-narration'
                  value={payment.narration}
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      narration: event.target.value,
                    })
                  }
                  placeholder='Describe your payment...'
                />
              </label>
            </div>
            <div className='form-element'>
              <label>
                Date
                <input
                  type='Date'
                  value={payment.date}
                  onChange={(event) =>
                    setPaymentData({ ...paymentData, date: event.target.value })
                  }
                />
              </label>
            </div>

            <div className='form-buttons'>
              <button onClick={clear} className='btn btn-cancel'>
                Clear
              </button>
              <button type='submit' className='btn btn-save'>
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
          (
            (
              <h4>Loading...</h4>
            )
          )
        )}
    </div>
  );
};

export default EditForm;
