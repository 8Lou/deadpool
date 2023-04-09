import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './cards.module.css';
import Button from '../../UI/Button';
import { AiFillStar } from 'react-icons/ai';
import Modal from './Modal';
import GroupBtnPlusMinus from '../../UI/GroupBtnPlusMinus';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addItem, minusItem } from '../../../redux/basket';
import { saveCartToLocalStorage } from '../../../helpers/localStorage';
import { useLocation } from 'react-router-dom';
import { Card, TypeOfFormType } from '../../../types/types';
import { deleteItems } from '../../../redux/items';
type SingleCardPropsType = {
  price: number;
  image: string;
  description: string;
  title: string;
  rating: number;
  favorite: boolean;
  id: number;
  setIsHiddenForm?: Dispatch<SetStateAction<boolean>>;
  setFormType?: Dispatch<SetStateAction<TypeOfFormType>>;
  setFormValue?: Dispatch<SetStateAction<Card>>;
};

const SingleCard: FC<SingleCardPropsType> = ({
  id,
  price,
  image,
  description,
  title,
  rating,
  favorite,
  setIsHiddenForm,
  setFormType,
  setFormValue,
}) => {
  const [isOpenModalCard, setIsOpenModalCard] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const count =
    useAppSelector((state) => state.basket.addedItems.find((el) => el.id === id))?.count ?? 0;

  const addedItem = {
    id,
    age: price,
    image,
    description,
    favorite,
    name: title,
    rate: rating,
    count,
  };
  const basket = useAppSelector((state) => state.basket.addedItems);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  useEffect(() => {
    if (isAuth) saveCartToLocalStorage(basket, 'basket');
  }, [isAuth, dispatch, basket]);
  return (
    <>
      <div className={styles.card}>
        <img
          className={styles.card_img}
          src={
            image ||
            'https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'
          }
          alt=""
        />
        <p className={styles.title}>{title}</p>
        <div className={styles.card_first_field}>
          <p className={styles.card_price}>${price}.00</p>
          {location.pathname !== '/admin' ? (
            <Button
              buttonHandler={() => {
                setIsOpenModalCard(true);
              }}>
              Show more
            </Button>
          ) : (
            <Button
              buttonHandler={() => {
                if (setIsHiddenForm && setFormType && setFormValue) {
                  const item: Card = { ...addedItem };
                  console.log(item);
                  setFormValue(item);
                  setFormType({ type: 'changeAdminItem', idx: id });
                  setIsHiddenForm(false);
                }
              }}>
              Change
            </Button>
          )}
          {rating}
          <AiFillStar className={styles.card_favorite} />
        </div>
        {location.pathname !== '/admin' ? (
          <div className={styles.card_second_field}>
            <p>Add to cart</p>
            <GroupBtnPlusMinus
              increment={() => {
                dispatch(addItem(addedItem));
              }}
              decrement={() => {
                dispatch(minusItem(addedItem));
              }}
              count={count}
            />
            <p className={styles.card_total_price}>Total: ${count * price || 0}.00</p>
          </div>
        ) : (
          <Button
            buttonHandler={() => {
              dispatch(deleteItems(id));
            }}
            absolute>
            Delete
          </Button>
        )}
      </div>
      <Modal
        isOpen={isOpenModalCard}
        setIsOpen={setIsOpenModalCard}
        image={image}
        description={description}
      />
    </>
  );
};

export default SingleCard;
