import { Box, CircularProgress, styled } from '@mui/material';

const StyledSpinnerWrapper = styled(Box, {
  name: 'StyledSpinnerWrapper',
})({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const Spinner: React.FC = () => {
  return (
    <StyledSpinnerWrapper>
      <CircularProgress />
    </StyledSpinnerWrapper>
  );
};
