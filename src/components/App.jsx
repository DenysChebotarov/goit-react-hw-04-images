import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PixabaiApi from './Api/PixabaiApi';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    hits: [],
    total: 0,
    loading: false,
    largeImageURL: '',
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.fetchImageName();
    }
  }

  fetchImageName = () => {
    const { imageName, page } = this.state;
    this.setState({ loading: true });
    PixabaiApi(imageName, page).then(res => {
      if (res.total === 0 && res.hits.length === 0) {
        Notiflix.Notify.failure(`${imageName} does not exist`);
      }
      this.setState(prevState => ({
        hits: [...prevState.hits, ...res.hits],
        total: res.total,
        loading: false,
      }));
    });
  };

  handleFormSubmit = searchName => {
    this.setState({
      hits: [],
      page: 1,
      imageName: searchName,
    });
  };

  loadmoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  clickImage = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  render() {
    const { hits, total, page, showModal, loading, largeImageURL } = this.state;
    const loadMore =
      total > page * 12 && loading ? (
        <Loader />
      ) : (
        total > page * 12 && (
          <Button loadmoreClick={this.loadmoreClick} text={'Load more'} />
        )
      );

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery clickImage={this.clickImage} hits={hits} />
        )}
        {loadMore}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
