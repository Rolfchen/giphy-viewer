import { useContext } from 'react';
import { SearchContext } from './SearchProvider';

/**
 * Hook to use the shared search context for performing giphy search
 */
const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'No search context found, this hook must be used within SearchProvider'
    );
  }
  return context;
};

export default useSearchContext;
