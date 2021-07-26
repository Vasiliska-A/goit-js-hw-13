import { refs } from './js/refs';
import { fetchImages } from './js/fetchimages';
import imageCardTmpl from './templates/imagecard.hbs';
import { Notify } from 'notiflix';
import './sass/main.scss';

refs.searchButton.addEventListener('click', renderImages);

let pageNumber = 1;

async function renderImages(event) {
  event.preventDefault();
  const query = refs.input.value;
  const pictures = await fetchImages(query, pageNumber);
  getGalleryMarkUp();
}

// function onSearchBtnClick(event) {
//

//    const pictures = await fetchImages(query);
//   if (query.trim('') === '') {
//     return;
//   }

//   return fetchImages(query).then(pictures => {
//     // if (pictures.hits.length === 0) {
//     //   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     // } else {
//     getGalleryMarkUp();

//     // refs.galleryWrapper.innerHTML = '';
//   });
// }

function getGalleryMarkUp(pictures) {
  const galleryMarkUp = pictures.map(imageCardTmpl).join('');
  refs.galleryWrapper.insertAdjacentHTML('afterbegin', galleryMarkUp);
}
