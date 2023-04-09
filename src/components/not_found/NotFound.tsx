import styles from './notFound.module.css';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.not_found_wrapper}>
      <h2>This page not found</h2>
      <div className={styles.not_found_image} />
      <div className={styles.not_found_text}>
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

export default NotFound;
