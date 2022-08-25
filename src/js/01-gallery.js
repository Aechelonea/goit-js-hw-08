import { galleryItems } from './gallery-items.js';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryParentElement = document.querySelector('.gallery');

galleryItems.forEach(photo => {
  galleryParentElement.insertAdjacentHTML(
    'beforeend',
    `<a class="gallery__item" href="${photo.original}">
      <img
        class="gallery__image"
        src="${photo.preview}"
        alt="${photo.description}"
      />
    </a>`
  );
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
