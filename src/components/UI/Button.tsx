import React, { FC, ReactNode } from 'react';
import styles from './ui.module.css';
type ButtonType = {
  children: ReactNode;
  buttonHandler: () => void;
  onMouseLeave?: () => void;
  absolute?: boolean;
  disabled?: boolean;
};
const Button: FC<ButtonType> = ({ children, buttonHandler, onMouseLeave, absolute, disabled }) => {
  let actualClass = styles.btn;
  if (absolute) actualClass += ` ${styles.absolute}`;
  if (disabled) actualClass += ` ${styles.disabled}`;
  return (
    <div className={actualClass} onClick={buttonHandler} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
};

export default Button;
