import { Link } from 'react-router-dom';
import './Progress.css';

const Progress = () => {
  return (
    <div className='progress'>
      <div className='bouncingLoader'>
        <div></div>
      </div>
      <Link to='/payment'>
        <div className='slideUpBtn'>
          <span>Add Payment</span>
        </div>
      </Link>
    </div>
  );
};

export default Progress;
