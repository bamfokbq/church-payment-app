import styles from './Footer.module.css'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <div className={styles.Footer}>
      <p className='church-name'>Methodist</p>
      <p className='created-date'>{year}</p>
    </div>
  );
};

export default Footer;
