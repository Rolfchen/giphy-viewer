import { AppBar, Container, Toolbar } from '@mui/material';
import styled from '@emotion/styled';
import SearchBar from './SearchBar';
import useSearchContext from '../contexts/SearchContext/useSearchContext';
import { useLocation, useNavigate } from 'react-router';

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 600;
`;

/**
 * Main navigation and where the search happens
 */
const TopNavigation = () => {
  const { searchTerm, dispatchSearch } = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = (newSearch?: string) => {
    console.log('Search', newSearch);
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
            gridTemplateColumns: 'auto 1fr',
          }}
        >
          <StyledLink href="/">Trending</StyledLink>
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
