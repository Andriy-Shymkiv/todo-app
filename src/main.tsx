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

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <AuthGuard>
            <App />
          </AuthGuard>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
