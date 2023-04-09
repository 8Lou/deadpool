import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Card, OnChangeSwitchHandlerFieldsVariant } from '../types/types';
import { validateAge, validateRate } from './validateAgeAndRate';

export const onChangeInputHandler = (
  e: ChangeEvent<HTMLInputElement>,
  field: OnChangeSwitchHandlerFieldsVariant,
  setFormValue: Dispatch<SetStateAction<Card>>,
) => {
  switch (field) {
    case 'name':
    case 'description':
    case 'image':
      setFormValue((prev) => ({ ...prev, [field]: e.target.value }));
      break;
    case 'age':
      const ageValue = Number(e.target.value);
      if (validateAge(ageValue)) setFormValue((prev) => ({ ...prev, [field]: ageValue }));
      break;
    case 'rate':
      const rateValue = Number(e.target.value);
      if (validateRate(rateValue)) setFormValue((prev) => ({ ...prev, [field]: rateValue }));
      break;
    case 'favorite':
      setFormValue((prev) => ({ ...prev, [field]: e.target.checked }));
      break;
    default:
      break;
  }
};
