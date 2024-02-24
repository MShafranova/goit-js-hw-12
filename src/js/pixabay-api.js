import axios from 'axios';

export async function fetchImages(userInput, page, imgPerPage) {
    const apiKey = '42524024-b4ed13b49ab793108dce16487';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${imgPerPage}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}