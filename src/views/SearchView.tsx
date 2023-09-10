import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import GiphyList from '../components/GiphyList';
import useGiphyManager from '../contexts/GiphyManagerContext/useGiphyManager';

const SearchViewFooter = styled.footer`
  display: flex;
  padding: 8px;
  justify-content: center;
`;

const SearchView = () => {
  const { searchResult, hasNextPage, fetchNextPage } = useGiphyManager();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fetchNextPage();
  };

  return (
    <>
      <Typography variant="h1">Search</Typography>
      <GiphyList giphyObjects={searchResult || []} />
      <SearchViewFooter>
        {hasNextPage && (
          <Button variant="contained" onClick={handleClick}>
            Load More...
          </Button>
        )}
      </SearchViewFooter>
    </>
  );
};

export default SearchView;
