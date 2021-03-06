// import PicturesApiService from './js/fetchimages';

import { refs } from './js/refs';
import { fetchImages } from './js/fetchimages';
import imageCardTmpl from './templates/imagecard.hbs';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

refs.searchButton.addEventListener('click', onSearchBtnClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let query = '';
let pageNumber = '';

var lightbox = new SimpleLightbox('.big-photo-href');
console.log(lightbox);

function onSearchBtnClick(event) {
  event.preventDefault();
  query = refs.input.value;
  pageNumber = 1;
  // console.log(pageNumber);
  refs.galleryWrapper.innerHTML = '';

  if (query !== '') {
    return fetchImages(query, pageNumber)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          refs.loadMoreBtn.classList.remove('shown');
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        } else {
          getGalleryMarkUp();
          refs.loadMoreBtn.classList.add('shown');

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
  lightbox.refresh();
}

function onLoadMore() {
  pageNumber += 1;
  // console.log(pageNumber);
  fetchImages(query, pageNumber)
    .then(pictures => {
      // const totalHitsAmount = pictures.totalHits;
      // console.log(totalHitsAmount);
      // console.log(pictures.hits.length);
      // console.log(pictures);
      // console.log(pageNumber);
      if (pictures.hits.length === 0) {
        console.log(pictures.hits.length);
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.remove('shown');
      } else {
        getGalleryMarkUp(pictures);
      }
    })
    .catch(Error);
}
