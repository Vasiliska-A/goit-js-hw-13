import axios from 'axios';

export async function fetchImages(query, pageNumber) {
  const KEY = '22642465-57d0411bfabfa4c5aaf497117';
  const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true&q=${query}&page=${pageNumber}&per_page=40&key=${KEY}`;
  const response = await axios.get(URL);
  return response.data.hits;
}
