import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './imageGallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  return (
    <ul className={styles.ImageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          showImage={showImage}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showImage: PropTypes.func.isRequired,
};
