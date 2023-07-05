import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './providers/AuthContext';
import { AuthGuard } from './wrappers/AuthGuard';

import './styles/index.css';
import { theme } from './theme';
import { Layout } from './wrappers/Layout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalContainer } from './components/Modals';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store';

const queryClient = new QueryClient();

const Root = (): JSX.Element => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <AuthGuard>
              <App />
              <ModalContainer />
              <Toaster position={'bottom-center'} />
            </AuthGuard>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
