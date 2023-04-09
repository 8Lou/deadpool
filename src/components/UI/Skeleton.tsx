import { FC } from 'react';
import styles from './ui.module.css';

const Skeleton: FC = () => {
  return (
    <>
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
    </>
  );
};

export default Skeleton;
