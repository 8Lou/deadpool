import { Dispatch, SetStateAction, FC } from 'react';
import styles from './cards.module.css';
import Button from '../../UI/Button';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  description: string;
  image: string;
};

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, description, image }) => {
  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal}>
            <img
              className={styles.modal_img}
              src={
                image ||
                'https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'
              }
              alt=""
            />
            <div className={styles.modal_content}>{description}</div>
            <Button buttonHandler={closeModal} absolute>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
