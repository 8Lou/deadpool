import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import Button from '../UI/Button';
import styles from './basket.module.css';
import EmptyCart from './EmptyCart';
import SingleOrder from './SingleOrder';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { getAddedItems } from '../../redux/basket';
import { saveCartToLocalStorage } from '../../helpers/localStorage';
type BasketPropsType = {
  setBasketIsHidden: Dispatch<SetStateAction<boolean>>;
};
const Basket: FC<BasketPropsType> = ({ setBasketIsHidden }) => {
  const totalPrice = useAppSelector((state) => state.basket.totalPrice);
  const addedItems = useAppSelector((state) => state.basket.addedItems);

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successfulOrder = () => {
    navigate('/thankyou');
    dispatch(getAddedItems([]));
  };
  useEffect(() => {
    if (isAuth) saveCartToLocalStorage(addedItems, 'basket');
  }, [addedItems, isAuth]);
  return (
    <div className={styles.basket_overlay}>
      <div className={styles.basket}>
        <span className={styles.btn_close}>
          <Button buttonHandler={() => setBasketIsHidden(true)}>Close</Button>
        </span>
        {addedItems.length === 0 ? (
          <EmptyCart setBasketIsHidden={setBasketIsHidden} />
        ) : (
          <>
            <div className={styles.orders}>
              {addedItems.map((item) => (
                <SingleOrder key={item.id} item={item} totalPrice={totalPrice} />
              ))}
            </div>
            <div className={styles.confirm_order}>
              Total price:{totalPrice}$
              <Button
                buttonHandler={() => {
                  setBasketIsHidden(true);
                  isAuth ? successfulOrder() : navigate('/register');
                }}>
                Order now
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
