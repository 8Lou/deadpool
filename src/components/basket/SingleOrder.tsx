import { FC, useEffect } from 'react';
import GroupBtnPlusMinus from '../UI/GroupBtnPlusMinus';
import styles from './basket.module.css';
import { AddedItems } from '../../types/types';
import { addItem, minusItem } from '../../redux/basket';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveCartToLocalStorage } from '../../helpers/localStorage';
type SingleOrderType = {
  totalPrice: number;
  item: AddedItems;
};
const SingleOrder: FC<SingleOrderType> = ({ item }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket.addedItems);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  useEffect(() => {
    if (isAuth) saveCartToLocalStorage(basket, 'basket');
  }, [isAuth, dispatch, basket]);
  return (
    <div className={styles.single_order}>
      <p className={styles.single_order_text}>{item.name}</p>
      <span className={styles.dashed_span}></span>
      <GroupBtnPlusMinus
        increment={() => {
          dispatch(addItem(item));
        }}
        decrement={() => {
          dispatch(minusItem(item));
        }}
        count={item.count}
      />
      <span className={styles.dashed_span}></span>
      <p className={styles.single_order_text}>Total {item.count * item.age || 0}$</p>
    </div>
  );
};

export default SingleOrder;
