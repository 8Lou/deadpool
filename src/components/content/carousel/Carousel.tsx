import { useState, FC } from 'react';
import styles from './carousel.module.css';
import Button from '../../UI/Button';
import { filterByCatalogName, getAllItems } from '../../../redux/items';
import { useAppDispatch } from '../../../redux/hooks';
import { FilterType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

export type CarouselProps = {
  images: {
    title: FilterType;
    image: string;
  }[];
};
const Carousel: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);

  const navigate = useNavigate();
  const handlePrevClick = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  const handleNextClick = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };
  const dispatch = useAppDispatch();
  return (
    <div className={styles.carousel_container}>
      <div className={styles.carousel_slides}>
        {images.map((el, index) => (
          <div
            key={index}
            className={
              index === currentIndex
                ? `${styles.carousel_slide} ${styles.active}`
                : styles.carousel_slide
            }>
            <p className={styles.title}>{el.title}</p>
            <Button
              buttonHandler={() => {
                setIsDisabledBtn(true);
                dispatch(getAllItems()).then((res) => {
                  dispatch(filterByCatalogName(el.title));
                  navigate('catalog');
                  window.scrollTo(0, 0);
                });
              }}
              absolute
              disabled={isDisabledBtn}>
              Show more
            </Button>
            <img src={el.image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <div>
        <button className={styles.carousel_prev} onClick={handlePrevClick}>
          &#8249;
        </button>
        <button className={styles.carousel_next} onClick={handleNextClick}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
