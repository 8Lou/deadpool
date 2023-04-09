import { FC, Dispatch, SetStateAction } from 'react';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { FilterType } from '../../types/types';

type HeaderSelectCatalogType = {
  buttonsName: FilterType[];
  setActiveTitle: Dispatch<SetStateAction<FilterType>>;
};
const HeaderSelectCatalog: FC<HeaderSelectCatalogType> = ({ setActiveTitle, buttonsName }) => {
  return (
    <Select>
      {buttonsName.map((btn, ind) => (
        <Button
          key={ind}
          buttonHandler={() => {
            setActiveTitle(btn);
          }}>
          {btn}
        </Button>
      ))}
    </Select>
  );
};

export default HeaderSelectCatalog;
