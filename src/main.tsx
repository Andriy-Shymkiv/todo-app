import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './context/AuthContext';

import './styles/index.css';
import { theme } from './theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
