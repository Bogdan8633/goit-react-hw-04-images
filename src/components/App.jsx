import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGalery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal.jsx';

import { searchImages } from '../shared/services/gallery-api';

import styles from './app.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState('');
  const [hitsQuantity, setHitsQuantity] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          data.hits.length === 0
            ? setError('Not found')
            : setItems(prevItems => [...prevItems, ...data.hits]);
          setHitsQuantity(data.totalHits);
          console.log(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page, setLoading, setError, setItems, setHitsQuantity]);

  const onSearchPictures = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
    setError(null);
    setHitsQuantity(null);
  };

  const showImage = largeImageURL => {
    setImageDetails(largeImageURL);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageDetails(null);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchPictures} />
      {items.length !== 0 && (
        <ImageGallery items={items} showImage={showImage} />
      )}
      {loading && <Loader />}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {hitsQuantity > items.length && !loading && (
        <Button onloadMore={loadMore} />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <img src={imageDetails} alt="" />
        </Modal>
      )}
    </>
  );
};

export default App;
