// import PicturesApiService from './js/fetchimages';

import { refs } from './js/refs';
import { fetchImages } from './js/fetchimages';
import imageCardTmpl from './templates/imagecard.hbs';
import { Notify } from 'notiflix';
import './sass/main.scss';

refs.searchButton.addEventListener('click', onSearchBtnClick);
refs.loadMMoreBtn.addEventListener('click', onLoadMore);

let query = '';
let pageNumber = '';

function onSearchBtnClick(event) {
  event.preventDefault();
  query = refs.input.value;
  pageNumber = 1;
  refs.loadMMoreBtn.classList.add('shown');
  refs.galleryWrapper.innerHTML = '';

  if (query !== '') {
    return fetchImages(query, pageNumber)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          console.log(pictures.hits);
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        } else {
          getGalleryMarkUp();
          const totalHits = pictures.totalHits;
          //   console.log(totalHits);
          Notify.info(`Hooray! We found ${totalHits} images.`);
        }
      })
      .catch(Error);
  }
}

async function getGalleryMarkUp() {
  query = refs.input.value;
  const pictures = await fetchImages(query, pageNumber);
  //   console.log(pictures.hits);
  const galleryMarkUp = pictures.hits.map(imageCardTmpl).join('');
  refs.galleryWrapper.insertAdjacentHTML('beforeend', galleryMarkUp);
}

function onLoadMore(event) {
  // event.preventDefault();
  refs.loadMMoreBtn.classList.remove('shown');
  pageNumber += 1;

  fetchImages(query)
    .then(pictures => {
      if (pictures.hits.length === 0) {
        console.log(pictures.hits);
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        getGalleryMarkUp();
      }
    })
    .catch(Error);
}
