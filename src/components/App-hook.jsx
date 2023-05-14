import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import PixabaiApi from './Api/PixabaiApi';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImageName();
  }, [imageName, page]);

  const fetchImageName = () => {
    setLoading(true);
    PixabaiApi(imageName, page).then(res => {
      if (res.total === 0 && res.hits.length === 0) {
        Notiflix.Notify.failure(`${imageName} does not exist`);
      }
      setHits(prevHits => [...prevHits, ...res.hits]);
      setTotal(res.total);
      setLoading(false);
    });
  };

  const handleFormSubmit = searchName => {
    setHits([]);
    setPage(1);
    setImageName(searchName);
  };

  const loadmoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const clickImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const loadMore =
    total > page * 12 && loading ? (
      <Loader />
    ) : (
      total > page * 12 && (
        <Button loadmoreClick={loadmoreClick} text={'Load more'} />
      )
    );

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {hits.length > 0 && <ImageGallery clickImage={clickImage} hits={hits} />}
      {loadMore}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </div>
  );
}
