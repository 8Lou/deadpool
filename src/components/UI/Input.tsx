import { FC } from 'react';
import styles from './ui.module.css';
import { AiOutlineClose } from 'react-icons/ai';
type InputType = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  disabled?: boolean;
  type?: string;
};
const Input: FC<InputType> = ({ placeholder, value, onChange, onClear, disabled, type }) => {
  return (
    <div className={`${styles.inp_wrapper} ${disabled ? styles.disabled : ''}`}>
      <input
        className={styles.inp}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type ? type : 'text'}
      />
      <AiOutlineClose className={styles.icon_close} onClick={onClear} />
    </div>
  );
};

export default Input;
