import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favourite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import { IGiphyGifObject } from '../types/giphyTypes';

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
  return (
    <ImageList variant="masonry" cols={4} gap={16} className={className}>
      {giphyObjects.map((giphyObject, index) => {
        const key = `${index}-${giphyObject.id}`;
        const { url: giphyUrl, height, width } = giphyObject.images.fixed_width;
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
                <IconButton>
                  <FavoriteBorderIcon />
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
