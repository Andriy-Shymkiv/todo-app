import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { removeTodo } from '~/api/todos';
import { constructDeleteTodoKey } from '~/helpers/getQueriesCache';
import { AuthContext } from '~/providers/AuthContext';
import { setSelectedTodoId } from '~/store/app/slice';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { useAppDispatch, useAppSelector } from '~/store/reduxHooks';
import { constructTodosCacheKey } from '~/helpers/getQueriesCache';
import { Todo } from '~/types/Todo';

type UseDeleteTodoInput = Pick<UseMutationOptions<void, Error, unknown>, 'onMutate' | 'onSuccess' | 'onError'>;

export const useDeleteTodo = (): UseMutationResult<void, Error, unknown> => {
  const { user } = useContext(AuthContext);
  const { selectedTodoId } = useAppSelector(({ app }) => app);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { closeModal } = useModalState();

  const callbacks: UseDeleteTodoInput = useMemo(
    () => ({
      onSuccess: (): void => {
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        dispatch(setSelectedTodoId(null));
        toast.success('Todo deleted successfully');
        closeModal();
      },
      onError: (): void => {
        toast.error('Error deleting todo');
      },
    }),
    [closeModal, dispatch, queryClient, user?.id],
  );

  return useMutation<void, Error, unknown>(
    constructDeleteTodoKey(),
    () => removeTodo(selectedTodoId ?? Infinity),
    callbacks,
  );
};

export const useDeleteAllTodos = (): UseMutationResult<void, Error, unknown> => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { closeModal } = useModalState();

  const handleDeleteAllTodos = (): Promise<any> => {
    const todos = queryClient.getQueryData<Todo[]>(constructTodosCacheKey(user?.id)); // get todos from cache

    return todos ? Promise.all(todos?.map((todo) => removeTodo(todo.id))) : Promise.resolve(); // delete all todos
  };

  const callbacks: UseDeleteTodoInput = useMemo(
    () => ({
      onSuccess: (): void => {
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        dispatch(setSelectedTodoId(null));
        toast.success('Todos deleted successfully');
        closeModal();
      },
      onError: (): void => {
        toast.error('Error deleting todos');
      },
    }),
    [closeModal, dispatch, queryClient, user?.id],
  );

  return useMutation<void, Error, unknown>(constructDeleteTodoKey(), handleDeleteAllTodos, callbacks);
};
