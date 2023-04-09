import styles from './basket.module.css';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const SuccessfulOrder = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.successful_order_wrapper}>
      <h2>Order successfully completed</h2>
      <div className={styles.successful_order} />
      <div className={styles.empty_cart_text}>
        <b>Thank you for your order!We will call you soon for delivery details</b>
        <Button
          buttonHandler={() => {
            navigate('/catalog');
          }}>
          Go to shop
        </Button>
      </div>
    </div>
  );
};

export default SuccessfulOrder;
