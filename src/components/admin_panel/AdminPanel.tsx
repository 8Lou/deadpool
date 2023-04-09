import React, { useEffect, useState } from 'react';
import Cards from '../content/cards/Cards';
import FormItem from './form/FormItem';
import { Card, FormHandlerType, TypeOfFormType } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { getAllItems } from '../../redux/items';
import AdminSettings from './AdminSettings';

const initialStateOfFormValue: Card = {
  id: 0,
  name: '',
  favorite: false,
  rate: 0,
  age: 0,
  description: '',
  image: '',
};
const initialStateOfFormType: TypeOfFormType = {
  type: 'addAdminItem',
  idx: undefined,
};
const AdminPanel = () => {
  const [isHiddenForm, setIsHiddenForm] = useState<boolean>(true);
  const [formValue, setFormValue] = React.useState<Card>(initialStateOfFormValue);
  const [formType, setFormType] = React.useState<TypeOfFormType>(initialStateOfFormType);
  const dispatch = useAppDispatch();
  const formHandler: FormHandlerType = (e, fetchAdminItem, idx) => {
    e.preventDefault();
    const newItem = { ...formValue, id: idx ? idx : Date.now() };
    fetchAdminItem(newItem, idx as number).then((res) => {
      if (
        res.data.message === 'Кот успешно добавлен в Базу данных' ||
        res.data.message === 'Данные о коте успешно изменены'
      )
        dispatch(getAllItems());
    });
    setIsHiddenForm(true);
    setFormValue(initialStateOfFormValue);
  };
  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);
  return (
    <div>
      <AdminSettings
        setIsHiddenForm={setIsHiddenForm}
        setFormType={setFormType}
        initialState={initialStateOfFormValue}
        setFormValue={setFormValue}
      />
      <Cards
        setIsHiddenForm={setIsHiddenForm}
        setFormType={setFormType}
        setFormValue={setFormValue}
      />
      <FormItem
        isHidden={isHiddenForm}
        setIsHidden={setIsHiddenForm}
        formValue={formValue}
        setFormValue={setFormValue}
        formType={formType}
        formHandler={formHandler}
      />
    </div>
  );
};

export default AdminPanel;
