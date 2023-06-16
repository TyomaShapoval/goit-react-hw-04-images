import { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import styles from './App.module.css';

const API_KEY = '35867216-72ed1ceebea896f77546d0ac6';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [noImagesFound, setNoImagesFound] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (query === '') return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.data.hits.length === 0 && page === 1) {
          setNoImagesFound(true);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setHasMoreImages(response.data.totalHits > page * 12);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
    setNoImagesFound(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchSubmit} />

      {noImagesFound ? (
        <p>No images found.</p>
      ) : (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}

      {loading && <Loader />}

      {hasMoreImages && images.length > 0 && !loading && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleModalClose} />
      )}
    </div>
  );
};


