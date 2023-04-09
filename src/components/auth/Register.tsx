import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FC, useState } from 'react';
import { auth } from '../../config/firebase';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import GoogleForm from './GoogleAuth';
import { useAppDispatch } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../helpers/confirmAuthorizedUser';

const Register: FC = () => {
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      confirmAuthorizedUser(auth, registerEmail, registerPassword, dispatch, navigate);
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_container}>
        <h3>Create account</h3>
        <Form
          handleSubmit={handleRegisterSubmit}
          setEmail={setRegisterEmail}
          setPassword={setRegisterPassword}
          email={registerEmail}
          password={registerPassword}
          buttonName="Register"
        />

        <div className={styles.links}>
          <Link to="/login">
            <p>I have account</p>
          </Link>
          <Link to="/">
            <p>Back</p>
          </Link>
        </div>
      </div>
      <GoogleForm buttonName="Register" headName="Register" />
    </div>
  );
};

export default Register;
