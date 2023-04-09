import { Auth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { setUserDataCookie } from '../hooks/useAutoSignIn';
import { isAuthTrue } from '../redux/auth';

type ConfirmAuthorizedUserType = (
  auth: Auth,
  email: string,
  password: string,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => void;

export const confirmAuthorizedUser: ConfirmAuthorizedUserType = (
  auth,
  email,
  password,
  dispatch,
  navigate,
) => {
  if (auth?.currentUser?.email) {
    dispatch(isAuthTrue(auth.currentUser.email));
    navigate('/');
    setUserDataCookie({ email, password });
  }
};
