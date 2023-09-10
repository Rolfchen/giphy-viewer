import { useContext } from 'react';
import { GiphyManagerContext } from './GiphyManagerProvider';

/**
 * Hook to use the shared search context for performing giphy search
 */
const useGiphyManager = () => {
  const context = useContext(GiphyManagerContext);
  if (!context) {
    throw new Error(
      'No search context found, this hook must be used within SearchProvider'
    );
  }
  return context;
};

export default useGiphyManager;
