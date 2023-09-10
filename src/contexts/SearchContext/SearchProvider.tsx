import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import {
  IGiphyGifObject,
  IGiphyTrendingResponse,
} from '../../types/giphyTypes';
import useSearchGiphy from '../../hooks/useSearchGiphy';
import { InfiniteData } from 'react-query';

export interface ISearchContext {
  searchTerm?: string;
  searchResult?: IGiphyGifObject[];
  searchResponse?: InfiniteData<IGiphyTrendingResponse>;
  dispatchSearch: (searchTerm?: string) => void;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage?: boolean;
}

export const SearchContext = createContext<ISearchContext | undefined>(
  undefined
);

export type SearchActionType = 'SET_SEARCH_TERM';

export interface ISearchAction {
  type: SearchActionType;
  searchState: {
    searchTerm?: string;
  };
}

export interface ISearchReducerState {
  searchTerm?: string;
}

const searchReducer = (
  state: ISearchReducerState,
  action: ISearchAction
): ISearchReducerState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.searchState.searchTerm,
      };
    default:
      throw new Error(`Unsupported action type provided: ${action.type}`);
  }
};

export interface ISearchProviderProps extends PropsWithChildren {}

/**
 * Provider to provide search functionalities to call giphy search API
 */
const SearchProvider = ({ children }: ISearchProviderProps) => {
  const [searchState, dispatch] = useReducer(searchReducer, {});
  console.log('Search state', searchState);
  const { data, hasNextPage, fetchNextPage, fetchPreviousPage } =
    useSearchGiphy({
      searchTerm: searchState.searchTerm,
    });

  const dispatchSearch = useCallback((searchTerm?: string) => {
    console.log('Start searching!');
    dispatch({
      type: 'SET_SEARCH_TERM',
      searchState: {
        searchTerm,
      },
    });
  }, []);

  const searchResult = useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    return data.pages.flatMap((response) => response.data);
  }, [data]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm: searchState.searchTerm,
        searchResult,
        searchResponse: data,
        dispatchSearch,
        hasNextPage,
        fetchNextPage,
        fetchPreviousPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
