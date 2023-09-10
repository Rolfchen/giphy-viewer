import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import { IGiphyGifObject } from '../types/giphyTypes';
import useGiphyManager from '../contexts/GiphyManagerContext/useGiphyManager';

export interface IGiphyListProps {
  className?: string;
  giphyObjects: IGiphyGifObject[];
}

const LazyLoadingImage = styled.img`
  @keyframes gradientBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  background: linear-gradient(45deg, #ff512f, #dd2476, #219d87);
  background-size: 600% 600%;
  animation: gradientBackground 10s ease infinite;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GiphyList = ({ giphyObjects, className }: IGiphyListProps) => {
  const { favourites, dispatchAddFavourite, dispatchRemoveFavourite } =
    useGiphyManager();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const gridColumnSize = isTablet ? 3 : 4;
  const gapSize = isTablet ? 8 : 16;

  return (
    <ImageList
      variant="masonry"
      cols={isMobile ? 1 : gridColumnSize}
      gap={gapSize}
      className={className}
    >
      {giphyObjects.map((giphyObject, index) => {
        const key = `${index}-${giphyObject.id}`;
        const { url: giphyUrl, height, width } = giphyObject.images.fixed_width;
        const isFavourite = favourites?.some(
          (favourite) => favourite.id === giphyObject.id
        );

        const toggleFavourites = () => {
          if (isFavourite) {
            console.log('Is Favourite, remove');
            dispatchRemoveFavourite(giphyObject.id);
          } else {
            console.log('It is not, add');
            dispatchAddFavourite(giphyObject);
          }
        };

        return (
          <ImageListItem key={key}>
            <LazyLoadingImage
              src={giphyUrl}
              alt={giphyObject.title}
              loading="lazy"
              style={{
                minHeight: `${height}px`,
                minWidth: `${width}px`,
              }}
            />

            <ImageListItemBar
              title={giphyObject.title}
              actionIcon={
                <IconButton onClick={toggleFavourites}>
                  {isFavourite ? (
                    <FavoriteIcon sx={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default GiphyList;
