import { FC } from 'react';
import styles from './ui.module.css';

type GroupBtnProps = {
  increment: () => void;
  decrement: () => void;
  count: number;
};

const GroupBtnPlusMinus: FC<GroupBtnProps> = ({ increment, decrement, count }) => {
  return (
    <div className={styles.cart_btn}>
      <button className={styles.button} onClick={decrement}>
        <span className={styles.minus}>-</span>
      </button>
      <p className={styles.card_quantity}>{count ?? 0}</p>
      <button className={styles.button} onClick={increment}>
        <span className={styles.plus}>+</span>
      </button>
    </div>
  );
};

export default GroupBtnPlusMinus;
