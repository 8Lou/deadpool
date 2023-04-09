import styles from './footer.module.css';
import { GiSpiderMask } from 'react-icons/gi';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>©2023</span>
      <span className={styles.footer_span}>
        Made by
        <span className={styles.author}>ds4045</span>
        <GiSpiderMask className={styles.footer_icon} />
      </span>
    </footer>
  );
};

export default Footer;
