import React, { Dispatch, SetStateAction } from 'react';
import { addCard, changeCard } from '../../../api/api';
import { Card, FormHandlerType, TypeOfFormType } from '../../../types/types';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import styles from './formItem.module.css';
import { onChangeInputHandler } from '../../../helpers/onChangeInputHandler';
type FormAdminItemProps = {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  setFormValue: Dispatch<SetStateAction<Card>>;
  formValue: Card;
  formHandler: FormHandlerType;
  formType: TypeOfFormType;
};

const FormAdminItem: React.FC<FormAdminItemProps> = ({
  isHidden,
  setIsHidden,
  setFormValue,
  formValue,
  formHandler,
  formType,
}) => {
  const fetchAdminItem = formType.type === 'addAdminItem' ? addCard : changeCard;

  return (
    <div className={styles.form_wrap} style={{ display: isHidden ? 'none' : '' }}>
      <div className={styles.form}>
        <form action="submit" onSubmit={(e) => formHandler(e, fetchAdminItem, formType.idx)}>
          <label>
            Item name
            <Input
              placeholder="Enter item name"
              onChange={(e) => onChangeInputHandler(e, 'name', setFormValue)}
              onClear={() => setFormValue((prev) => ({ ...prev, name: '' }))}
              value={formValue.name}
            />
          </label>
          <label>
            Description
            <Input
              placeholder="Enter description"
              onChange={(e) => onChangeInputHandler(e, 'description', setFormValue)}
              onClear={() => setFormValue((prev) => ({ ...prev, description: '' }))}
              value={formValue.description}
            />
          </label>
          <label>
            Price
            <Input
              placeholder="Enter price"
              onChange={(e) => onChangeInputHandler(e, 'age', setFormValue)}
              value={formValue.age.toString()}
              type="number"
            />
          </label>
          <label>
            Rating
            <Input
              placeholder="Enter rating"
              onChange={(e) => onChangeInputHandler(e, 'rate', setFormValue)}
              value={formValue.rate.toString()}
              type="number"
            />
          </label>
          <label>
            Image URL
            <Input
              placeholder="Enter image URL"
              onChange={(e) => onChangeInputHandler(e, 'image', setFormValue)}
              onClear={() => setFormValue((prev) => ({ ...prev, image: '' }))}
              value={formValue.image}
            />
          </label>
          <label>
            <div className={styles.form_checkbox}>
              Favorite
              <input
                onChange={(e) => onChangeInputHandler(e, 'favorite', setFormValue)}
                type="checkbox"
              />
            </div>
          </label>
          <div className={styles.btn_group}>
            <button type="submit" className={styles.submit_btn}>
              {formType.type === 'addAdminItem' ? 'Add' : 'Change'}
            </button>
            <Button buttonHandler={() => setIsHidden(true)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAdminItem;
