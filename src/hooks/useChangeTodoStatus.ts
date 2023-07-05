import { useMutation, UseMutationResult, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { updateTodo } from '~/api/todos';
import { AuthContext } from '~/providers/AuthContext';
import { setSelectedTodoId } from '~/store/app/slice';
import { useAppDispatch } from '~/store/reduxHooks';
import { Todo } from '~/types/Todo';
import {
  constructChangeAllTodoStatusKey,
  constructChangeTodoStatusKey,
  constructTodosCacheKey,
} from '~/helpers/getQueriesCache';

type UseChangeTodoStatusInput = Pick<UseMutationOptions<void, unknown, number>, 'onMutate' | 'onSuccess' | 'onError'>;
type UseChangeAllTodosStatusInput = Pick<
  UseMutationOptions<void, unknown, boolean, unknown>,
  'onMutate' | 'onSuccess' | 'onError'
>;

export const useChangeTodoStatus = (): UseMutationResult<void, unknown, number> => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateTodoStatus = (todoId: number): Promise<any> => {
    const todos = queryClient.getQueryData<Todo[]>(constructTodosCacheKey(user?.id)); // get todos from cache
    const currentTodo = todos?.find((todo) => todo.id === todoId) as Todo; // find the todo to update

    return updateTodo(todoId, { ...currentTodo, completed: !currentTodo.completed }); // update todo
  };

  const callbacks: UseChangeTodoStatusInput = useMemo(
    () => ({
      onSuccess: (): void => {
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        dispatch(setSelectedTodoId(null));
        toast.success('Status updated');
      },
      onError: (): void => {
        toast.error('Error updating status');
      },
    }),
    [dispatch, queryClient, user],
  );

  return useMutation(constructChangeTodoStatusKey(), updateTodoStatus, callbacks);
};

export const useChangeAllTodosStatus = (): UseMutationResult<void, unknown, boolean, unknown> => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const updateAllTodosStatus = (completed: boolean): Promise<any> => {
    const todos = queryClient.getQueryData<Todo[]>(constructTodosCacheKey(user?.id)); // get todos from cache

    return todos ? Promise.all(todos?.map((todo) => updateTodo(todo.id, { ...todo, completed }))) : Promise.resolve(); // update all todos
  };

  const callbacks: UseChangeAllTodosStatusInput = useMemo(
    () => ({
      onSuccess: (): void => {
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        toast.success('Statuses updated');
      },
      onError: (): void => {
        toast.error('Error updating statuses');
      },
    }),
    [queryClient, user],
  );

  return useMutation(constructChangeAllTodoStatusKey(), updateAllTodosStatus, callbacks);
};
