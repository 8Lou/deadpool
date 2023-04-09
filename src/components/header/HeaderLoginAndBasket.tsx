import { Dispatch, FC, SetStateAction } from 'react';
import { BsCartFill } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineLogin } from 'react-icons/ai';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signOut } from 'firebase/auth';
import { isAuthFalse } from '../../redux/auth';
import { auth } from '../../config/firebase';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { FiSettings } from 'react-icons/fi';
type HeaderIconsPropsType = {
  setBasketIsHidden: Dispatch<SetStateAction<boolean>>;
};

const HeaderLoginAndBasket: FC<HeaderIconsPropsType> = ({ setBasketIsHidden }) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const addedItems = useAppSelector((state) => state.basket.addedItems);
  const login = useAppSelector((state) => state.auth.login);
  const dispatch = useAppDispatch();
  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      dispatch(isAuthFalse());
      setUserDataCookie(null);
    } catch (err: any) {
      alert(err.message);
    }
  };
  console.log(login);
  return (
    <>
      <div className={styles.icons}>
        <span className={styles.basket_span}>
          <span className={styles.basket_span_icons}>
            <BsCartFill onClick={() => setBasketIsHidden(false)} />
            {addedItems.reduce((acc, curr) => acc + curr.count, 0) || 0}
          </span>
          {isAuth ? (
            <>
              <FiSettings
                onClick={() =>
                  login === 'ddd@ddd.ru' ? navigate('/admin') : navigate('/no-rights')
                }
              />
              <AiOutlineLogin onClick={handleLogoutClick} />
            </>
          ) : (
            <>
              <div></div>
              <AiOutlineUser
                onClick={() => {
                  navigate('register');
                }}
              />
            </>
          )}
        </span>
      </div>
      {isAuth && <span className={styles.login_name}>{login.split('@')[0]}</span>}
    </>
  );
};

export default HeaderLoginAndBasket;
