import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { FC, useState } from 'react';
import { auth } from '../../config/firebase';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import GoogleForm from './GoogleAuth';
import { useAppDispatch } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../helpers/confirmAuthorizedUser';

const Login: FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginWithEmailPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail('');
      setLoginPassword('');
      confirmAuthorizedUser(auth, loginEmail, loginPassword, dispatch, navigate);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_container}>
        <h3>Login with email and password</h3>
        <Form
          handleSubmit={handleLoginWithEmailPasswordSubmit}
          setEmail={setLoginEmail}
          setPassword={setLoginPassword}
          email={loginEmail}
          password={loginPassword}
          buttonName="Login"
        />
        <div className={styles.links}>
          <Link to="/register">
            <p>Register</p>
          </Link>
          <Link to="/">
            <p>Back</p>
          </Link>
        </div>
      </div>
      <GoogleForm buttonName="Login" headName="Sign in" />
    </div>
  );
};

export default Login;
