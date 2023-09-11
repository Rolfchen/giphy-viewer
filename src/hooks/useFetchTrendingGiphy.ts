import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import getEnv from '../utils/getEnv';
import { IGiphyTrendingResponse } from '../types/giphyTypes';

export interface IFetchTrendingGiphyParams {
  pageParam?: {
    offset: number;
  };
}

const pageSize = parseInt(getEnv('VITE_GIPHY_PAGE_SIZE'));

const fetchTrendingGiphy = async ({ pageParam }: IFetchTrendingGiphyParams) => {
  const { offset = 0 } = pageParam || {};
  const endpoint = `${getEnv('VITE_GIPHY_URL')}/gifs/trending`;
  const response = await axios.get<IGiphyTrendingResponse>(endpoint, {
    params: {
      api_key: getEnv('VITE_GIPHY_API_KEY'),
      limit: pageSize,
      offset,
    },
  });

  return response.data;
};

const fetchNextPageParam = (lastPage: IGiphyTrendingResponse) => {
  const { offset, total_count } = lastPage.pagination;
  const nextOffset = offset + pageSize;

  if (nextOffset > total_count) {
    return;
  }

  return {
    offset: nextOffset,
  };
};

/**
 * React query hook to fetch trending gifs from Giphy API
 */
const useFetchTrendingGiphy = () => {
  return useInfiniteQuery({
    queryKey: ['fetchTrendingGiphy'],
    queryFn: fetchTrendingGiphy,
    getNextPageParam: fetchNextPageParam,
    refetchOnWindowFocus: false,
  });
};

export default useFetchTrendingGiphy;
