import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ loadmoreClick, text }) {
  return (
    <button className={css.Button} type="button" onClick={loadmoreClick}>
      {text}
    </button>
  );
}
Button.propTypes = {
  loadmoreClick : PropTypes.func.isRequired,
  text : PropTypes.string.isRequired
}