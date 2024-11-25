import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchPhotos = async (searchedQuery, page) => {
  const axiosOptions = {
    params: {
      query: searchedQuery,
      orientation: 'portrait',
      page,
      per_page: 20,
      client_id: 'ghtWRvlh9H1tGNm1lBUUSi7VXnp7C_q1xzmvHvtnREU',
    },
  };

  return await axios.get(`/search/photos`, axiosOptions);
};

export default fetchPhotos;