import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import getEnv from '../utils/getEnv';
import { IGiphyTrendingResponse } from '../types/giphyTypes';

export interface IUseSearchGiphy {
  searchTerm?: string;
}

export interface ISearchGiphyParams extends IUseSearchGiphy {
  pageParam?: {
    offset: number;
  };
}

const pageSize = parseInt(getEnv('VITE_GIPHY_PAGE_SIZE'));

const searchGiphy = async ({ pageParam, searchTerm }: ISearchGiphyParams) => {
  const { offset = 0 } = pageParam || {};
  const endpoint = `${getEnv('VITE_GIPHY_URL')}/gifs/search`;
  const response = await axios.get<IGiphyTrendingResponse>(endpoint, {
    params: {
      api_key: getEnv('VITE_GIPHY_API_KEY'),
      limit: pageSize,
      offset,
      q: searchTerm,
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
 * React query hook to search Giphy API
 */
const useSearchGiphy = ({ searchTerm = '' }: IUseSearchGiphy) => {
  return useInfiniteQuery({
    queryKey: ['searchGiphy', searchTerm],
    queryFn: ({ pageParam }) => searchGiphy({ pageParam, searchTerm }),
    getNextPageParam: fetchNextPageParam,
    refetchOnWindowFocus: false,
  });
};

export default useSearchGiphy;
