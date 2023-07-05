import { Card, styled } from '@mui/material';
import { Header } from './components/Header.tsx';
import { TodoList } from './components/Todo/TodoList';

const StyledTodoAppCard = styled(Card, {
  name: 'StyledTodoAppCard',
})(({ theme }) => ({
  width: 460,
  height: 580,
  padding: theme.spacing(6),
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(1),
}));

export const App: React.FC = (): JSX.Element => {
  return (
    <StyledTodoAppCard>
      <Header />
      <TodoList />
    </StyledTodoAppCard>
  );
};
