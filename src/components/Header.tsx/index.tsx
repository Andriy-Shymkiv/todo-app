import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, Button, styled } from '@mui/material';
import { useCallback } from 'react';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { ModalType } from '~/store/modal/types';
import { AppMenu } from './AppMenu';
import { TodoStatusSwitcher } from './TodoStatusSwitcher';

const StyledAddTodoButton = styled(Button, {
  name: 'StyledAddTodoButton',
})(({ theme }) => ({
  borderRadius: '50%',
  height: 64,
  minWidth: 64,
  boxShadow: theme.shadows[3],
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
export const Header = (): JSX.Element => {
  const { openModal } = useModalState();

  const onAddTodoClick = useCallback((): void => {
    openModal({ modalType: ModalType.ADD_TODO });
  }, [openModal]);

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={6}>
      <AppMenu />

      <Typography variant='h6'>{'All Tasks'}</Typography>

      <Box>
        <TodoStatusSwitcher />
        <StyledAddTodoButton onClick={onAddTodoClick}>
          <AddIcon fontSize='large' />
        </StyledAddTodoButton>
      </Box>
    </Box>
  );
};
