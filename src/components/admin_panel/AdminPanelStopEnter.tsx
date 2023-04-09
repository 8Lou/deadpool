import Button from '../UI/Button';
import styles from './form/formItem.module.css';
import { useNavigate } from 'react-router-dom';

const AdminPanelStopEnter = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.stop_image_content}>
      <h3>You don't have enough rights log in as an administrator</h3>
      <div className={styles.stop_image} />
      <div className={styles.stop_image_text}>
        <Button
          buttonHandler={() => {
            navigate('/');
          }}>
          Back
        </Button>
        <Button
          buttonHandler={() => {
            navigate('/login');
          }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminPanelStopEnter;
