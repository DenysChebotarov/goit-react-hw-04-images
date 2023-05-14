import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  clickImage,
}) {
  return (
    <li
      onClick={() => clickImage(largeImageURL)}
      className={css.imageGalleryItem}
    >
      <img className={css.imageGalleryItem_image} src={webformatURL} alt="" />
    </li>
  );
}
ImageGalleryItem.propTypes ={
  webformatURL : PropTypes.string.isRequired,
  largeImageURL : PropTypes.string.isRequired,
  clickImage : PropTypes.func.isRequired,
}