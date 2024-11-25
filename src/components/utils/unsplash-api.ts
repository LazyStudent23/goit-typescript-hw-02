import axios from 'axios';
import { PhotosResponse } from '../../types/types';


axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchPhotos = async (searchedQuery: string, page: number): Promise<PhotosResponse> => {
  const axiosOptions = {
    params: {
      query: searchedQuery,
      orientation: 'portrait',
      page,
      per_page: 20,
      client_id: 'ghtWRvlh9H1tGNm1lBUUSi7VXnp7C_q1xzmvHvtnREU',
    },
  };

  const { data } = await axios.get<PhotosResponse>(`/search/photos`, axiosOptions);
  return data;
};

export default fetchPhotos;