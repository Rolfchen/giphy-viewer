import { Typography } from '@mui/material';
import useGiphyManager from '../contexts/GiphyManagerContext/useGiphyManager';
import GiphyList from '../components/GiphyList';

const FavouriteView = () => {
  const { favourites } = useGiphyManager();

  return (
    <>
      <Typography variant="h1">My Favourites</Typography>
      <GiphyList giphyObjects={favourites || []} />
    </>
  );
};

export default FavouriteView;
