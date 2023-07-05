import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { useChangeAllTodosStatus } from '~/hooks/useChangeTodoStatus';
import { useTodos } from '~/hooks/useTodos';

export const TodoStatusSwitcher = (): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const { data: todos } = useTodos();
  const { mutate: changeAllTodosStatusMutate } = useChangeAllTodosStatus();

  useEffect(() => {
    setChecked(todos?.every((todo) => todo.completed) ?? false);
  }, [todos]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    setChecked(checked);
    changeAllTodosStatusMutate(checked);
  };

  return <Switch checked={checked} onChange={handleChange} disabled={!todos?.length} />;
};
