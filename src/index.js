import { refs } from './js/refs';
import { fetchImages } from './js/fetchimages';
import imageCardTmpl from './templates/imagecard.hbs';
import { Notify } from 'notiflix';
import './sass/main.scss';

// refs.searchForm.addEventListener('submit', fetchImages);
refs.searchButton.addEventListener('click', onSearchBtnClick);

let query = '';
let pageNumber = 1;

async function getGalleryMarkUp() {
  query = refs.input.value;
  const pictures = await fetchImages(query, pageNumber);
  //   console.log(pictures.hits);
  const galleryMarkUp = pictures.hits.map(imageCardTmpl).join('');
  refs.galleryWrapper.insertAdjacentHTML('afterbegin', galleryMarkUp);
}

function onSearchBtnClick(event) {
  event.preventDefault();
  console.log('12313');
  query = refs.input.value;
  //   refs.galleryWrapper.innerHTML = '';

  if (query !== '') {
    return fetchImages(query)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          console.log(pictures.hits);
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        } else {
          getGalleryMarkUp();
          const totalHits = pictures.totalHits;
          console.log(totalHits);
          Notify.info(`Hooray! We found ${totalHits} images.`);
        }
      })
      .catch(Error);
  }
}
