import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import useSearchContext from '../contexts/SearchContext/useSearchContext';
import GiphyList from '../components/GiphyList';

const SearchViewFooter = styled.footer`
  display: flex;
  padding: 8px;
  justify-content: center;
`;

const SearchView = () => {
  const { searchResult, hasNextPage, fetchNextPage } = useSearchContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fetchNextPage();
  };

  console.log('Result', searchResult);

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
