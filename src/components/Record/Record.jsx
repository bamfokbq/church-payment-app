import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import './Record.css';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import Progress from './Progress/Progress';
import { truncateString } from '../../utils/utils';
import Header from '../Header/Header';
import Spinner from '../../utils/Spinner/Spinner';

const Record = () => {
  const [payments, setPayments] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://church-payment.herokuapp.com/payments'
      );
      if (!response.data.length) {
        setIsShow(true);
      }
      setPayments(response.data);
    }

    fetchData();
  }, [setIsShow]);

  const handleDelete = async (id) => {
    const filteredPayments = await payments.filter(
      (payment) => payment._id !== id
    );

    await axios
      .delete(`https://church-payment.herokuapp.com/payments/${id}`)
      .then((res) => {
        setPayments(filteredPayments);
        return res.data;
      });
  };

  return (
    <>
      <Header />
      {!payments.length ? (
        <div>{isShow ? <Progress /> : <Spinner />}</div>
      ) : (
        <div>
          <Search />
          <table className='records'>
            <thead>
              <tr>
                <th>name</th>
                <th>Amount</th>
                <th>Contact</th>
                <th>Payment Type</th>
                <th>Date</th>
                <th>Narration</th>
                <th></th>
                {/*<th></th> */}
                <th></th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => {
                return (
                  <tr key={payment._id}>
                    <td>{payment.memberName}</td>
                    <td>
                      {payment.currency} {payment.amount.toFixed(2)}
                    </td>
                    <td>0{payment.telephone}</td>
                    <td>{payment.paymentType}</td>
                    <td>{format(new Date(payment.date), 'dd-MM-yyyy')}</td>
                    <td>{truncateString(payment.narration)}</td>
                    <td className='icon icon-visible'>
                      <Link
                        className='remove-style'
                        to={`/record/${payment._id}`}>
                        <VisibilityIcon className='icons' />
                      </Link>
                    </td>
                    {/*<td className='icon icon-edit'>
                      <Link className='edit-remove' to={`/edit/${payment._id}`}>
                        <EditIcon className='icons' />
                      </Link>
                    </td> */}
                    <td className='icon icon-delete'>
                      <DeleteIcon
                        className='icons'
                        onClick={() => handleDelete(payment._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Record;
