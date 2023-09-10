import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import MainView from './views/MainView';
import GiphyManagerProvider from './contexts/GiphyManagerContext/GiphyManagerProvider';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <GiphyManagerProvider>
            <MainView />
          </GiphyManagerProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
