import { Dispatch, FC, SetStateAction } from 'react';
import Button from '../UI/Button';
import styles from './form/formItem.module.css';
import { Card, TypeOfFormType } from '../../types/types';
type AdminSettingsProps = {
  setIsHiddenForm: Dispatch<SetStateAction<boolean>>;
  setFormType: Dispatch<SetStateAction<TypeOfFormType>>;
  initialState: Card;
  setFormValue: Dispatch<SetStateAction<Card>>;
};

const AdminSettings: FC<AdminSettingsProps> = ({
  setIsHiddenForm,
  setFormType,
  initialState,
  setFormValue,
}) => {
  return (
    <div className={styles.add_btn_wrapper}>
      <Button
        buttonHandler={() => {
          setIsHiddenForm(false);
          setFormType({ type: 'addAdminItem', idx: undefined });
          setFormValue(initialState);
        }}>
        Add Item
      </Button>
    </div>
  );
};

export default AdminSettings;
