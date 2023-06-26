import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './providers/AuthContext';
import { AuthGuard } from './wrappers/AuthGuard';

import './styles/index.css';
import { theme } from './theme';
import { Layout } from './wrappers/Layout';

const Root = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Layout>
        <AuthGuard>
          <App />
        </AuthGuard>
      </Layout>
    </AuthProvider>
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
