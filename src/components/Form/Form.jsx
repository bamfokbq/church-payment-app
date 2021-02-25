import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

const Form = () => {
  const [isOpen] = useState(false);
  const history = useHistory();

  const [paymentData, setPaymentData] = useState({
    memberName: '',
    telephone: '',
    paymentType: '',
    amount: 0,
    narration: '',
    date: '',
    paymentMethod: '',
    currency: '',
    order: '',
  });

  const clear = () => {
    setPaymentData({
      memberName: '',
      telephone: '',
      paymentType: '',
      amount: 0,
      narration: '',
      date: '',
      paymentMethod: '',
      currency: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      // https://church-payment.herokuapp.com/payments
      .post('https://church-payment.herokuapp.com/payments', { ...paymentData })
      .then((res) => {
        console.log(res);
      });

    clear();
    await history.push('/record');
  };

  return (
    <div className='form-center'>
      <Header />
      {!isOpen && (
        <div className='form-container container'>
          <form onSubmit={handleSubmit}>
            <div className='form-element'>
              <label>
                Member Name
                <input
                  type='text'
                  value={paymentData.memberName}
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
                  value={paymentData.telephone}
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
            <div className='form-element currency-amount'>
              <label>
                Payment Type
                <select
                  value={paymentData.paymentType}
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
              <label>
                Payment Method
                <select
                  value={paymentData.paymentMethod}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      paymentMethod: event.target.value,
                    })
                  }>
                  <option value='Default'>Choose mode of payment</option>
                  <option value='Cash'>Cash</option>
                  <option value='MOMO'>MOMO</option>
                  <option value='Bank Transfer'>Bank Transfer</option>
                  <option value='Others'>Others</option>
                </select>
              </label>
            </div>
            <div className='form-element currency-amount'>
              <label>
                Amount
                <input
                  type='number'
                  required
                  value={paymentData.amount}
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      amount: event.target.value,
                    })
                  }
                  placeholder='Enter your amount...'
                />
              </label>
              <label>
                Currency
                <select
                  value={paymentData.currency}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      currency: event.target.value,
                    })
                  }>
                  <option value='Default'>Select Currency</option>
                  <option value='GHS'>GHS</option>
                  <option value='USD'>USD</option>
                  <option value='EURO'>EURO</option>
                  <option value='Others'>Others</option>
                </select>
              </label>
            </div>
            <div className='form-element'>
              <label>
                Narration
                <textarea
                  className='form-narration'
                  value={paymentData.narration}
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
                  value={paymentData.date}
                  onChange={(event) =>
                    setPaymentData({ ...paymentData, date: event.target.value })
                  }
                />
              </label>
            </div>
            <div className='form-element'>
              <label>
                Entered By
                <input
                  type='text'
                  value={paymentData.admin}
                  required
                  onChange={(event) =>
                    setPaymentData({
                      ...paymentData,
                      admin: event.target.value,
                    })
                  }
                  placeholder='Enter the name of admin.....'
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
      )}
    </div>
  );
};

export default Form;
