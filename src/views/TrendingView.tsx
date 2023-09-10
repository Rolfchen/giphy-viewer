import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import useFetchTrendingGiphy from '../hooks/useFetchTrendingGiphy';
import GiphyList from '../components/GiphyList';

const TrendingViewFooter = styled.footer`
  display: flex;
  padding: 8px;
  justify-content: center;
`;

const TrendingView = () => {
  const { data, hasNextPage, fetchNextPage } = useFetchTrendingGiphy();

  const { pages = [] } = data || {};

  const giphyList = pages.flatMap((giphyResponse) => giphyResponse.data);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fetchNextPage();
  };
  return (
    <>
      <Typography variant="h1">Trending</Typography>
      <GiphyList giphyObjects={giphyList} />
      <TrendingViewFooter>
        {hasNextPage && (
          <Button variant="contained" onClick={handleClick}>
            Load More...
          </Button>
        )}
      </TrendingViewFooter>
    </>
  );
};

export default TrendingView;
