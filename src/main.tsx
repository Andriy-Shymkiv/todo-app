import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './providers/AuthContext';
import { AuthGuard } from './providers/AuthGuard';

import './styles/index.css';
import { theme } from './theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AuthGuard>
        <App />
      </AuthGuard>
    </AuthProvider>
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
