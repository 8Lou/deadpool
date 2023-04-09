import React, { ReactNode, FC } from 'react';
import styles from './ui.module.css';
type SelectType = {
  children: ReactNode;
};

const Skeleton: FC<SelectType> = ({ children }) => {
  return <div className={styles.select}>{children}</div>;
};

export default Skeleton;
