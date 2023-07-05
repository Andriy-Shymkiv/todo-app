import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { updateTodo } from '~/api/todos';
import { constructTodosCacheKey, constructUpdateTodoKey } from '~/helpers/getQueriesCache';
import { AuthContext } from '~/providers/AuthContext';
import { setSelectedTodoId } from '~/store/app/slice';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { useAppDispatch, useAppSelector } from '~/store/reduxHooks';
import { Todo } from '~/types/Todo';

type UseUpdateTodoInput = Pick<UseMutationOptions<void, Error, Partial<Todo>>, 'onMutate' | 'onSuccess' | 'onError'>;

export const useUpdateTodo = (): UseMutationResult<void, Error, Partial<Todo>> => {
  const { user } = useContext(AuthContext);
  const { closeModal } = useModalState();
  const { selectedTodoId } = useAppSelector(({ app }) => app);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const todos = queryClient.getQueryData<Todo[]>(constructTodosCacheKey(user?.id));

  const handleUpdateTodo = useCallback(
    (updatedTodoFields: Partial<Todo>): Promise<void> => {
      const currentTodo = todos?.find((todo) => todo.id === selectedTodoId) as Todo;

      return updateTodo(selectedTodoId ?? Infinity, {
        ...currentTodo,
        ...updatedTodoFields,
      });
    },
    [selectedTodoId, todos],
  );

  const callbacks: UseUpdateTodoInput = useMemo(
    () => ({
      onSuccess: (): void => {
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        dispatch(setSelectedTodoId(null));
        closeModal();
        toast.success('Todo updated successfully');
      },
      onError: (): void => {
        toast.error('Error updating todo');
      },
    }),
    [closeModal, dispatch, queryClient, user],
  );

  return useMutation<void, Error, Partial<Todo>>(constructUpdateTodoKey(), handleUpdateTodo, callbacks);
};
