import { Box, styled } from '@mui/material';
import { ReactNode } from 'react';

const StyledContentWrapper = styled(Box, {
  name: 'StyledContentWrapper',
})({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>;
};
