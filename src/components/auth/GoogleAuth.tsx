import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuth } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../helpers/confirmAuthorizedUser';
type GoogleFormProps = {
  buttonName: 'Login' | 'Register';
  headName: 'Sign in' | 'Register';
};

const GoogleAuth: FC<GoogleFormProps> = ({ buttonName, headName }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginWithGoogleSubmit = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      confirmAuthorizedUser(auth, googleAuth.providerId, googleAuth.providerId, dispatch, navigate);
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className={styles.login_with_Google}>
      <h3>{headName} with Google</h3>
      <button onClick={handleLoginWithGoogleSubmit}>
        {buttonName} with Google <FcGoogle className={styles.google_icon} />
      </button>
    </div>
  );
};

export default GoogleAuth;
