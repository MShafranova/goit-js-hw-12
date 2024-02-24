import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function showErrorToast(message) {
  iziToast.error({
    title: '',
    backgroundColor: '#ec5d5d',
    message,
    position: 'topRight'
  });
}

export function renderGallery(images, galleryElement, options) {
  const markup = images
    .map(data => {
      return `<li class="gallery-item"><a href="${data.webformatURL}">
        <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
        <div class='comments'>
        <p><b>Likes </b>${data.likes}</p>
        <p><b>Views </b>${data.views}</p>
        <p><b>Comments </b>${data.comments}</p>
        <p><b>Downloads </b>${data.downloads}</p>
        </div>
        </li>`;
    })
    .join('');

  galleryElement.innerHTML += markup;
  const lightbox = new SimpleLightbox('.gallery a', options);
  lightbox.refresh();
  return markup;
}

export function showLoader(loaderElement) {
  loaderElement.style.display = 'inline-block';
}

export function hideLoader(loaderElement) {
  loaderElement.style.display = 'none';
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}