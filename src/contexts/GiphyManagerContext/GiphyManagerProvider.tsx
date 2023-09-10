import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  IGiphyGifObject,
  IGiphyTrendingResponse,
} from '../../types/giphyTypes';
import useSearchGiphy from '../../hooks/useSearchGiphy';
import { InfiniteData } from 'react-query';
import getFavourites from '../../utils/Db/getFavourites';
import addToFavourites from '../../utils/Db/addToFavourites';
import removeFromFavorites from '../../utils/Db/removeFromFavourites';

export interface IGiphyManagerContext {
  searchTerm?: string;
  searchResult?: IGiphyGifObject[];
  searchResponse?: InfiniteData<IGiphyTrendingResponse>;
  favourites?: IGiphyGifObject[];
  dispatchSearch: (searchTerm?: string) => void;
  dispatchAddFavourite: (favouriteGiphy: IGiphyGifObject) => void;
  dispatchRemoveFavourite: (giphyId: string) => void;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage?: boolean;
}

export const GiphyManagerContext = createContext<
  IGiphyManagerContext | undefined
>(undefined);

export type GiphyActionType =
  | 'SET_SEARCH_TERM'
  | 'SET_FAVOURITES'
  | 'ADD_TO_FAVOURITES'
  | 'REMOVE_FAVOURITE';

export interface IGiphyManagerAction {
  type: GiphyActionType;
  searchState?: {
    searchTerm?: string;
  };
  // TODO - split out to separate action payloads to improve readability.
  favouriteState?: {
    favourites?: IGiphyGifObject[];
    favouriteIdToRemove?: string;
  };
}

export interface IGiphyManagerReducerState {
  searchTerm?: string;
  favourites: IGiphyGifObject[];
}

const giphyManagerReducer = (
  state: IGiphyManagerReducerState,
  action: IGiphyManagerAction
): IGiphyManagerReducerState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action?.searchState?.searchTerm,
      };
    case 'SET_FAVOURITES':
      return {
        ...state,
        favourites: action?.favouriteState?.favourites || [],
      };
    case 'ADD_TO_FAVOURITES':
      return {
        ...state,
        favourites: [
          ...state.favourites,
          ...(action?.favouriteState?.favourites || []),
        ],
      };
    case 'REMOVE_FAVOURITE': {
      const updatedFavourites = state.favourites.filter(
        (favourite) =>
          action?.favouriteState?.favouriteIdToRemove !== favourite.id
      );
      return {
        ...state,
        favourites: [...updatedFavourites],
      };
    }

    default:
      throw new Error(`Unsupported action type provided: ${action.type}`);
  }
};

export interface IGiphyManagerProviderProps extends PropsWithChildren {}

/**
 * Provider to provide search functionalities to call giphy search API
 */
const GiphyManagerProvider = ({ children }: IGiphyManagerProviderProps) => {
  const [searchState, dispatch] = useReducer(giphyManagerReducer, {
    favourites: [],
  });
  const { data, hasNextPage, fetchNextPage, fetchPreviousPage } =
    useSearchGiphy({
      searchTerm: searchState.searchTerm,
    });

  // TODO - create internal custom hook for readability.
  useEffect(() => {
    const checkFavourites = async () => {
      const dbFavourites = await getFavourites();
      dispatch({
        type: 'SET_FAVOURITES',
        favouriteState: {
          favourites: dbFavourites,
        },
      });
    };
    checkFavourites();
  }, []);

  const dispatchSearch = useCallback((searchTerm?: string) => {
    dispatch({
      type: 'SET_SEARCH_TERM',
      searchState: {
        searchTerm,
      },
    });
  }, []);

  const dispatchAddFavourite = useCallback(
    async (favourite: IGiphyGifObject) => {
      await addToFavourites(favourite);
      // optimistic update to avoid call. Review to see if this is ideal.
      dispatch({
        type: 'SET_FAVOURITES',
        favouriteState: {
          favourites: [...searchState.favourites, favourite],
        },
      });
    },
    [searchState.favourites]
  );

  const dispatchRemoveFavourite = useCallback(
    async (giphyId: string) => {
      await removeFromFavorites(giphyId);

      const updatedFavourites = searchState.favourites.filter(
        (favourite) => favourite.id !== giphyId
      );
      dispatch({
        type: 'SET_FAVOURITES',
        favouriteState: {
          favourites: [...updatedFavourites],
        },
      });
    },
    [searchState.favourites]
  );

  const searchResult = useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    return data.pages.flatMap((response) => response.data);
  }, [data]);

  return (
    <GiphyManagerContext.Provider
      value={{
        searchTerm: searchState.searchTerm,
        searchResult,
        searchResponse: data,
        dispatchSearch,
        dispatchAddFavourite,
        dispatchRemoveFavourite,
        hasNextPage,
        fetchNextPage,
        fetchPreviousPage,
        favourites: searchState.favourites,
      }}
    >
      {children}
    </GiphyManagerContext.Provider>
  );
};

export default GiphyManagerProvider;
