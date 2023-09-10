import styled from '@emotion/styled';

import TopNavigation from '../components/TopNavigation';
import { ViewContainer } from '../styled/ViewContainer';
import { Route, Routes } from 'react-router-dom';
import TrendingView from './TrendingView';
import SearchView from './SearchView';

const MainContainer = styled(ViewContainer)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(10)};
`;

const MainView = () => {
  return (
    <>
      <TopNavigation />
      <MainContainer>
        <Routes>
          <Route path="/" element={<TrendingView />} />
          <Route path="/search" element={<SearchView />} />
        </Routes>
      </MainContainer>
    </>
  );
};

export default MainView;
