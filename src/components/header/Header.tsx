import { ReactNode, useState, FC, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './header.module.css';
import logo_deadpool from '../../assets/logo_deadpool.png';
import { useAppDispatch } from '../../redux/hooks';
import Button from '../UI/Button';
import HeaderSelect from './HeaderSelect';
import Input from '../UI/Input';
import { Link } from 'react-router-dom';
import { searchItems } from '../../redux/items';
import { ButtonsHeaderType, FilterType } from '../../types/types';
import useDebounce from '../../hooks/useDebounce';
import HeaderLoginAndBasket from './HeaderLoginAndBasket';
import { useActiveTitle } from '../../hooks/useActiveTitle';

type HeaderPropsType = {
  isDisabled: boolean;
  setBasketIsHidden: Dispatch<SetStateAction<boolean>>;
};
const Header: FC<HeaderPropsType> = ({ isDisabled, setBasketIsHidden }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectInnerHTMLSort, setSelectInnerHTMLSort] = useState<string | ReactNode>('Filter');
  const [selectInnerHTMLCatalog, setSelectInnerHTMLCatalog] = useState<string | ReactNode>(
    'Catalog',
  );
  const [activeTitleSort, setActiveTitleSort] = useState<FilterType>('Filter');
  const [activeTitleCatalog, setActiveTitleCatalog] = useState<FilterType>('Catalog');
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);
  const dispatch = useAppDispatch();
  const buttons: ButtonsHeaderType[] = [
    {
      id: 'catalog_button',
      buttonsName: ['Deadpool', 'X-MEN', 'Marvel', 'DC', 'Spider-Man', 'ALL'],
      setActiveTitle: setActiveTitleCatalog,
      setSelectInnerHTML: setSelectInnerHTMLCatalog,
      activeTitle: activeTitleCatalog,
      selectInnerHTML: selectInnerHTMLCatalog,
    },
    {
      id: 'sort_button',
      buttonsName: ['By rating', 'By price'],
      setActiveTitle: setActiveTitleSort,
      setSelectInnerHTML: setSelectInnerHTMLSort,
      activeTitle: activeTitleSort,
      selectInnerHTML: selectInnerHTMLSort,
    },
  ];
  useActiveTitle(activeTitleCatalog);
  useActiveTitle(activeTitleSort);
  useEffect(() => {
    dispatch(searchItems({ search: debouncedSearchTerm, title: activeTitleCatalog }));
  }, [debouncedSearchTerm, dispatch, activeTitleCatalog]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className={styles.header}>
      <Link
        to="/"
        onClick={() => {
          setActiveTitleCatalog('Catalog');
          setSelectInnerHTMLCatalog('Catalog');
          setActiveTitleSort('Filter');
          setSelectInnerHTMLSort('Filter');
        }}>
        <img className={styles.logo_header} src={logo_deadpool} alt="" />
      </Link>
      <div className={styles.btn_group}>
        {buttons.map((btn) => (
          <Link to="catalog" className={styles.header_link} key={btn.id}>
            <Button
              buttonHandler={() => {
                btn.setSelectInnerHTML(
                  <HeaderSelect
                    setActiveTitle={btn.setActiveTitle}
                    buttonsName={btn.buttonsName}
                  />,
                );
              }}
              onMouseLeave={() => {
                btn.setSelectInnerHTML(btn.activeTitle);
              }}>
              {btn.selectInnerHTML}
            </Button>
          </Link>
        ))}
        <Input
          disabled={isDisabled}
          placeholder="search"
          value={searchTerm}
          onChange={handleInputChange}
          onClear={() => setSearchTerm('')}
        />
      </div>
      <HeaderLoginAndBasket setBasketIsHidden={setBasketIsHidden} />
    </header>
  );
};

export default Header;
