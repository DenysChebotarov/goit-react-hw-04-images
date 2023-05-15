import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import css from './Searchbar.module.css'

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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import css from './Searchbar.module.css';
// import { BsSearch } from 'react-icons/bs';
// import Notiflix from 'notiflix';

// export default class SearchBar extends Component {
//   state = {
//     imageName: '',
//   };
//   handleNameChange = event => {
//     this.setState({ imageName: event.currentTarget.value.toLowerCase() });
//   };
//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.imageName.trim() === '') {
//       Notiflix.Notify.failure('You have not entered anything');
//       return;
//     }
//     this.props.onSubmit(this.state.imageName);
//     this.setState({ imageName: '' });
//   };
//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.searchForm}>
//           <button type="submit" className={css.searchForm_button}>
//             <BsSearch />
//           </button>

//           <input
//             className={css.searchForm_input}
//             type="text"
//             name="name"
//             value={this.state.imageName}
//             onChange={this.handleNameChange}
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
// SearchBar.propTypes ={
//   onSubmit : PropTypes.func.isRequired
// }