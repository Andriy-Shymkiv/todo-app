import AddIcon from '@mui/icons-material/Add';
import { Box, Button, styled } from '@mui/material';
import { useCallback } from 'react';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { ModalType } from '~/store/modal/types';
import { AppMenu } from './AppMenu';
import { TodoStatusSwitcher } from './TodoStatusSwitcher';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDeleteAllTodos } from '~/hooks/useDeleteTodo';
import { useTodos } from '~/hooks/useTodos';

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

const ToggleButton = styled(Button, {
  name: 'ToggleButton',
})({
  padding: 0,
  minWidth: 0,
});

export const Header = (): JSX.Element => {
  const { openModal } = useModalState();
  const { data: todos } = useTodos();
  const { mutate: onDeleteAllTodosMutate } = useDeleteAllTodos();

  const onAddTodoClick = useCallback((): void => {
    openModal({ modalType: ModalType.ADD_TODO });
  }, [openModal]);

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={6}>
      <AppMenu />

      <Box>
        <ToggleButton onClick={(): void => onDeleteAllTodosMutate({})} disabled={!todos?.length}>
          <HighlightOffIcon color={'error'} />
        </ToggleButton>

        <TodoStatusSwitcher />
        <StyledAddTodoButton onClick={onAddTodoClick}>
          <AddIcon fontSize='large' />
        </StyledAddTodoButton>
      </Box>
    </Box>
  );
};
