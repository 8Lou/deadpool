import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getAllItems } from '../../../redux/items';
import SingleCard from './SingleCard';
import styles from './cards.module.css';
import Skeleton from '../../UI/Skeleton';
import { Card, TypeOfFormType } from '../../../types/types';
type CardsProps = {
  setIsHiddenForm?: Dispatch<SetStateAction<boolean>>;
  setFormType?: Dispatch<SetStateAction<TypeOfFormType>>;
  setFormValue?: Dispatch<SetStateAction<Card>>;
};
const Cards: FC<CardsProps> = ({ setIsHiddenForm, setFormType, setFormValue }) => {
  const filteredItems = useAppSelector((state) => state.items.filteredItems);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const items = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (items?.length === 0) dispatch(getAllItems());
  }, [dispatch, filteredItems, items]);
  return (
    <div className={styles.wrapper_for_items}>
      {isLoading && <Skeleton />}
      {filteredItems?.map((item) => (
        <SingleCard
          setFormType={setFormType}
          setIsHiddenForm={setIsHiddenForm}
          rating={item.rate}
          id={item.id}
          favorite={item.favorite}
          key={item.id}
          price={item.age}
          image={item.image}
          description={item.description}
          title={item.name}
          setFormValue={setFormValue}
        />
      ))}
    </div>
  );
};

export default Cards;
