import React, { Dispatch, SetStateAction, FC } from 'react';
import styles from './basket.module.css';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
type EmptyCartType = {
  setBasketIsHidden: Dispatch<SetStateAction<boolean>>;
};
const EmptyCart: FC<EmptyCartType> = ({ setBasketIsHidden }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.basket_content}>
      <h2>My order</h2>
      <div className={styles.empty_cart} />
      <div className={styles.empty_cart_text}>
        <b>Your cart is empty</b>
        <Button
          buttonHandler={() => {
            navigate('catalog');
            setBasketIsHidden(true);
          }}>
          Go to shop
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
