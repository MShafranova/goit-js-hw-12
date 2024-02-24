import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  showErrorToast,
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';

const form = document.querySelector('#form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-btn');
const endMessage = document.querySelector('.end-message');
let page;
let imgPerPage = 15;
let userInput = '';

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 300,
  widthRatio: 0.9,
  scaleImageToRatio: true,
};

loader.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    userInput = document.getElementById('search').value.trim();

    if (!userInput) {
      return;
    }
    page = 1;
    gallery.innerHTML = '';

    showLoader(loader);
    clearGallery(gallery);

    try {
      const data = await fetchImages(userInput, page, imgPerPage);
      handleResponse(data);
     } catch (error) {
      console.error('Error fetching data:', error);
      showErrorToast(
        'An error occurred while fetching data. Please try again.'
      );
    } finally {
      hideLoader(loader);
    }
  });

});
function handleResponse(data) {
  if (data.hits.length === 0) {
    showErrorToast(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  } else {
    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits, options));
    form.reset();
    const totalShownImg = (page - 1) * imgPerPage + data.hits.length;
    const lightbox = new SimpleLightbox('.gallery a', options);
    
    lightbox.refresh();
    if (totalShownImg < data.totalHits) {
        loadMoreBtn.classList.remove('hidden');
        endMessage.classList.add('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
        endMessage.classList.remove('hidden');
      }
  }
}

loadMoreBtn.addEventListener('click', loadMoreImg);

async function loadMoreImg() {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(userInput, page, imgPerPage);
    handleResponse(data);
    smoothScroll();
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loader.classList.add('hidden');
  }
  endMessage.classList.add('hidden');
}


function smoothScroll() {
    const galleryItemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: galleryItemHeight * 2,
      behavior: 'smooth',
    });
  }
