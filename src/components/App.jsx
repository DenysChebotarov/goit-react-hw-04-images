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
    if(imageName === ''){
      return;
    }
    setLoading(true);
    PixabaiApi(imageName, page).then(res => {
      if (res.total === 0 && res.hits.length === 0) {
        Notiflix.Notify.failure(`${imageName} does not exist`);
      }
      setHits(prevHits => [...prevHits, ...res.hits]);
      setTotal(res.total);
      setLoading(false);
    });
  }, [imageName, page]);

  

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

// import React, { Component } from 'react';
// import Notiflix from 'notiflix';
// import PixabaiApi from './Api/PixabaiApi';
// import SearchBar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';

// export class App extends Component {
//   state = {
//     imageName: '',
//     page: 1,
//     hits: [],
//     total: 0,
//     loading: false,
//     largeImageURL: '',
//     showModal: false,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.imageName !== this.state.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchImageName();
//     }
//   }

//   fetchImageName = () => {
//     const { imageName, page } = this.state;
//     this.setState({ loading: true });
//     PixabaiApi(imageName, page).then(res => {
//       if (res.total === 0 && res.hits.length === 0) {
//         Notiflix.Notify.failure(`${imageName} does not exist`);
//       }
//       this.setState(prevState => ({
//         hits: [...prevState.hits, ...res.hits],
//         total: res.total,
//         loading: false,
//       }));
//     });
//   };

//   handleFormSubmit = searchName => {
//     this.setState({
//       hits: [],
//       page: 1,
//       imageName: searchName,
//     });
//   };

//   loadmoreClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   clickImage = largeImageURL => {
//     this.setState({ largeImageURL, showModal: true });
//   };

//   render() {
//     const { hits, total, page, showModal, loading, largeImageURL } = this.state;
//     const loadMore =
//       total > page * 12 && loading ? (
//         <Loader />
//       ) : (
//         total > page * 12 && (
//           <Button loadmoreClick={this.loadmoreClick} text={'Load more'} />
//         )
//       );

//     return (
//       <div>
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         {hits.length > 0 && (
//           <ImageGallery clickImage={this.clickImage} hits={hits} />
//         )}
//         {loadMore}
//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
//         )}
//       </div>
//     );
//   }
// }
