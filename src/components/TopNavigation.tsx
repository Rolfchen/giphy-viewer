import { AppBar, Container, Toolbar } from '@mui/material';
import styled from '@emotion/styled';
import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router';
import useGiphyManager from '../contexts/GiphyManagerContext/useGiphyManager';

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.common.white};
  font-weight: 600;
`;

/**
 * Main navigation and where the search happens
 */
const TopNavigation = () => {
  const { searchTerm, dispatchSearch } = useGiphyManager();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = (newSearch?: string) => {
    dispatchSearch(newSearch);
    // if not already on the search page, go to it.
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            gap: 4,
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
          }}
        >
          <StyledLink href="/">Trending</StyledLink>
          <StyledLink href="/favourites">Favourites</StyledLink>
          <SearchBar
            onSearch={handleSearch}
            initialSearchTerm={searchTerm}
            placeholder={'Search for a giphy'}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavigation;
