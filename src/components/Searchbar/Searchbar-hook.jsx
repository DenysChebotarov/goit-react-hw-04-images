import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      Notiflix.Notify.failure('You have not entered anything');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchForm_button}>
          <BsSearch />
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          name="name"
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
